import { GuildMember, Interaction, InteractionResponse } from "discord.js";
import commandCache from '../libs/commandRegistry'
import logger from "../libs/logger";
import { getOrCreateDiscordUser } from "../libs/discordUser/business";
import { getOrCreateDiscordGuildMember } from "../libs/discordGuildMember/business";
import { DiscordGuild, DiscordGuildMember } from "../types";
import { getOrCreateDiscordGuild } from "../libs/discordGuild/business";
import { isUserRateLimited } from "../libs/commandExecution/business";
import hdate from 'human-date'
export default async function(interaction: Interaction): Promise<void>{
    logger.debug(`Handling interaction ${interaction.id}`)

    logger.debug(`Handling pre-check conditions and getting discord user meta`)
    const [discordUser] = await Promise.all([getOrCreateDiscordUser(interaction.user.id)])
    //TODO replace with real discord guild
    let guildMember: DiscordGuildMember | null = null
    let discordGuild: DiscordGuild | null = null
    if(interaction.inGuild()){
        discordGuild = await getOrCreateDiscordGuild(interaction.guildId)
        logger.debug(`Interaction is in guild, getting guild member meta`)
        const discordApiGuildMember = interaction.member as GuildMember
        guildMember = await getOrCreateDiscordGuildMember(discordApiGuildMember.id, discordUser.id, discordGuild!.id)
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
            logger.debug(`Checking ratea limit status`)
            const isUserRatedLimited = await isUserRateLimited(guildMember!.id, command)
            logger.debug(`User is ${isUserRatedLimited ? '' : 'not'} rate limited`)

            if(isUserRatedLimited){
                interaction.reply({content: `You are rate limited, come back in ${hdate.relativeTime(isUserRateLimited.)}`, ephemeral: true})
                return
            }
        }

        logger.debug(`Executing command ${interaction.commandName}`)
        try {
            await command.execute(interaction)
        } catch (error) {
            logger.error(`Error executing command ${interaction.commandName} ${error}`)
            await interaction.reply({content: 'There was an error while executing this command', ephemeral: true})
        }
    }
}