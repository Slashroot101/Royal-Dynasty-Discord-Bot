import { relations } from "drizzle-orm";
import { pgSchema, uuid, text, date } from "drizzle-orm/pg-core";

export const schema = pgSchema("royal")

export const DiscordUserSchema = schema.table("discord_user", {
    id: uuid("id").notNull(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const DiscordGuildMemberSchema = schema.table("discord_guild_member", {
    id: uuid("id").notNull(),
    discordUserId: uuid("discordUserId").notNull(),
    discordGuildId: uuid("discordGuildId").notNull(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const DiscordGuildSchema = schema.table("discord_guild", {
    id: uuid("id").notNull(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const discordUserGuildMemberRelation = relations(DiscordUserSchema, ({many}) => ({
    userToGuildMember: many(DiscordGuildMemberSchema)
}))
