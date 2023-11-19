export type AppConfig = {
    discordToken: string,
    discordClientId: string,
    discordClientSecret: string,
    db: {
        host: string,
        port: string,
        username: string,
        password: string
    },
}

import { SlashCommandBuilder } from "discord.js"

export type Command = {
  data: SlashCommandBuilder;
  execute: Function;
}