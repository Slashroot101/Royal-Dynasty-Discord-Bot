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
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { DiscordGuildMemberSchema, DiscordGuildSchema, DiscordUserSchema, commandSchema, guildCommandSchema } from "./libs/database/schemas";

export type Command = {
  id?: string
  data: SlashCommandBuilder;
  execute: Function;
  defaultCooldownInSeconds?: number;
  numAllowedUses?: number;
}

export type RateLimitResponse = {
  rateLimited: boolean;
  nextAvailableAt: Date;
}

export type CreatedDiscordUser = InferInsertModel<typeof DiscordUserSchema>
export type DiscordUser = InferSelectModel<typeof DiscordUserSchema>
export type DiscordGuild = InferSelectModel<typeof DiscordGuildSchema>
export type CreatedDiscordGuild = InferInsertModel<typeof DiscordGuildSchema>
export type CreatedDiscordGuildMember = InferInsertModel<typeof DiscordGuildMemberSchema>
export type DiscordGuildMember = InferSelectModel<typeof DiscordGuildMemberSchema>
export type CommandDataObject = InferSelectModel<typeof commandSchema>
export type CreatedCommandObject = InferInsertModel<typeof commandSchema>
export type GuildCommand = InferSelectModel<typeof guildCommandSchema>
export type CreatedGuildCommand = InferInsertModel<typeof guildCommandSchema> 