import { GuildMember, Interaction, InteractionResponse } from "discord.js";
import commandCache from '../libs/commandRegistry'
import logger from "../libs/logger";
import { getOrCreateDiscordUser } from "../libs/discordUser/business";
import { getOrCreateDiscordGuildMember } from "../libs/discordGuildMember/business";
import { DiscordGuild, DiscordGuildMember, UserGuildBank } from "../types";
import { getOrCreateDiscordGuild } from "../libs/discordGuild/business";
import { isUserRateLimited, saveUserExecutedCommand } from "../libs/commandExecution/business";
import humanizeDuration from 'humanize-duration'
import { getOrCreateUserGuildBank } from "../libs/userGuildBank/business";
export default async function(interaction: Interaction): Promise<void>{
    logger.debug(`Handling interaction ${interaction.id}`)

    logger.debug(`Handling pre-check conditions and getting discord user meta`)
    const [discordUser] = await Promise.all([getOrCreateDiscordUser(interaction.user.id)])
    //TODO replace with real discord guild
    let guildMember: DiscordGuildMember | null = null
    let discordGuild: DiscordGuild | null = null
    let userBank: UserGuildBank | null = null
    if(interaction.inGuild()){
        discordGuild = await getOrCreateDiscordGuild(interaction.guildId)
        logger.debug(`Interaction is in guild, getting guild member meta`)
        const discordApiGuildMember = interaction.member as GuildMember
        guildMember = await getOrCreateDiscordGuildMember(discordApiGuildMember.id, discordUser.id, discordGuild!.id)
        logger.debug(`Getting user guild bank meta`)
        userBank = await getOrCreateUserGuildBank(guildMember.id)
    }

    logger.debug(`Passed pre-check conditions and got meta`)
    if(interaction.isChatInputCommand()){
        const command = commandCache.get(interaction.commandName)
        if(!interaction.inGuild()){
            interaction.reply(`Interactions can only happen within guilds!`)
            return
        }
        if(!command){
            logger.warn(`Command ${interaction.commandName} not found in cache`)
            interaction.reply({content: 'Command not found', ephemeral: true})
            return
        }

        if(command.id){
            logger.debug(`Checking rate limit status`)
            const rateLimit = await isUserRateLimited(guildMember!.id, command)
            logger.debug(`User is ${rateLimit.rateLimited ? '' : 'not'} rate limited`)
            console.log(rateLimit.nextAvailableAt)
            if(rateLimit.rateLimited){
                interaction.reply({content: `You are rate limited, come back in ${humanizeDuration(rateLimit.nextAvailableAt.getTime() - new Date().getTime(), {maxDecimalPoints: 0, round: true})}`, ephemeral: true})
                return
            }
        }

        logger.debug(`Executing command ${interaction.commandName}`)
        try {
            await saveUserExecutedCommand(command.id!, guildMember!.id)
            await command.execute(interaction, {
                user: discordUser,
                guild: discordGuild!,
                guildMember: guildMember!,
                bank: userBank!
            })
        } catch (error) {
            logger.error(`Error executing command ${interaction.commandName} ${error}`)
            await interaction.reply({content: 'There was an error while executing this command', ephemeral: true})
        }
    }
}