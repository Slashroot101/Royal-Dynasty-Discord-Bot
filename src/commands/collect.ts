import { SlashCommandBuilder } from "discord.js"
import * as DiscordJsTypes from 'discord.js/typings'
import { Command, CommandExecutionContext } from "../types"
import { incrementUserBank } from "../libs/userGuildBank/business"
import logger from "../libs/logger"
export default {
    name: "collect",
    defaultCooldownInSeconds: 86400,
    numAllowedUses: 1,
    data: new SlashCommandBuilder().setName("collect").setDescription("Collects your currency for the day!"),
    async execute(interaction: DiscordJsTypes.ChatInputCommandInteraction, context: CommandExecutionContext): Promise<void> {
        logger.debug(`Executing collect command for user ${context.user.id}`)
        const randCollectionAmount = Math.floor(Math.random() * 100) + 1
        logger.debug(`Incrementing user bank by ${randCollectionAmount}`)
        await incrementUserBank(context.bank.id, randCollectionAmount)
        logger.debug(`Incremented user bank by ${randCollectionAmount}`)
        await interaction.reply(`You collected ${randCollectionAmount}!`)
        logger.debug(`Replied to user ${context.user.id}`)
    }
}