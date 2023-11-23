import { SlashCommandBuilder } from "discord.js"
import * as DiscordJsTypes from 'discord.js/typings'
import { Command, CommandExecutionContext } from "../types"
export default {
    name: "balance",
    defaultCooldownInSeconds: 500,
    numAllowedUses: 1,
    data: new SlashCommandBuilder().setName("balance").setDescription("Replies with your balance!"),
    async execute(interaction: DiscordJsTypes.ChatInputCommandInteraction, context: CommandExecutionContext): Promise<void> {
        await interaction.reply(`Your balance is ${context.bank.balance}!`)
    }
} as Command