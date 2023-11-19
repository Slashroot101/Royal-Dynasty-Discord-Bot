import { SlashCommandBuilder } from "discord.js"
import * as DiscordJsTypes from 'discord.js/typings'
export default {
    name: "ping",
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    async execute(interaction: DiscordJsTypes.ChatInputCommandInteraction): Promise<void> {
        await interaction.reply('Pong!')
    }
} 