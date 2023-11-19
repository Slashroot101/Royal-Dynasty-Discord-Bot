import { relations } from "drizzle-orm";
import { pgSchema, uuid, text, date } from "drizzle-orm/pg-core";

export const schema = pgSchema("royal")

export const DiscordUser = schema.table("discord_user", {
    id: uuid("id").notNull(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt").defaultNow(),
    updadatedAt: date("updatedAt").defaultNow()
})

export const DiscordGuildMember = schema.table("discord_guild_member", {
    id: uuid("id").notNull(),
    discordUserId: uuid("discordUserId").notNull(),
    discordGuildId: uuid("discordGuildId").notNull(),
    memberId: uuid("memberId").notNull(),
    createdAt: date("createdAt").defaultNow(),
    updadatedAt: date("updatedAt").defaultNow()   
})

export const DiscordGuild = schema.table("discord_guild", {
    id: uuid("id").notNull(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt").defaultNow(),
    updadatedAt: date("updatedAt").defaultNow()
})

export const discordUserGuildMemberRelation = relations(DiscordUser, ({many}) => ({
    userToGuildMember: many(DiscordGuildMember)
}))
