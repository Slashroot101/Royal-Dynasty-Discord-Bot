import { SlashCommandBuilder } from "discord.js"
import * as DiscordJsTypes from 'discord.js/typings'
import { Command } from "../types"
export default {
    name: "ping",
    defaultCooldownInSeconds: 500,
    numAllowedUses: 1,
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    async execute(interaction: DiscordJsTypes.ChatInputCommandInteraction): Promise<void> {
        await interaction.reply('Pong!')
    }
} as Command