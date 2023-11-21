import { relations } from "drizzle-orm";
import { pgSchema, uuid, text, date, integer, boolean } from "drizzle-orm/pg-core";

export const schema = pgSchema("royal")

export const DiscordUserSchema = schema.table("discord_user", {
    id: uuid("id").notNull().primaryKey(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const DiscordGuildMemberSchema = schema.table("discord_guild_member", {
    id: uuid("id").notNull().primaryKey(),
    discordUserId: uuid("discordUserId").notNull(),
    discordGuildId: uuid("discordGuildId").notNull(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const DiscordGuildSchema = schema.table("discord_guild", {
    id: uuid("id").notNull().primaryKey(),
    snowflake: text("snowflake").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const discordUserGuildMemberRelation = relations(DiscordUserSchema, ({many}) => ({
    userToGuildMember: many(DiscordGuildMemberSchema)
}))

export const commandSchema = schema.table("command", {
    id: uuid("id").notNull().primaryKey(),
    name: text("name").notNull().unique(),
    defaultNumAllowedUses: integer("numAllowedUses").notNull(),
    defaultCooldownInSeconds: integer("cooldownInSeconds").notNull(),
    deleted: boolean("deleted").notNull().default(false),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const guildCommandSchema = schema.table("guild_command", {
    id: uuid("id").notNull().primaryKey(),
    commandId: uuid("commandId").notNull(),
    discordGuildId: uuid("discordGuildId").notNull(),
    numAllowedUses: integer("numAllowedUses").notNull(),
    cooldownInSeconds: integer("cooldownInSeconds").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const commandExecutionSchema = schema.table("command_execution", {
    id: uuid("id").notNull().primaryKey(),
    commandId: uuid("commandId").notNull(),
    discordGuildMemberId: uuid("discordGuildMemberId").notNull(),
    createdAt: date("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: date("updatedAt", {mode: 'date'}).defaultNow().notNull()
})