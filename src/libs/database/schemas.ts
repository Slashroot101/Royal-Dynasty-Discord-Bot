import { relations } from "drizzle-orm";
import { pgSchema, uuid, text, date, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const schema = pgSchema("royal")

export const DiscordUserSchema = schema.table("discord_user", {
    id: uuid("id").notNull().primaryKey(),
    snowflake: text("snowflake").notNull(),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const DiscordGuildMemberSchema = schema.table("discord_guild_member", {
    id: uuid("id").notNull().primaryKey(),
    discordUserId: uuid("discordUserId").notNull(),
    discordGuildId: uuid("discordGuildId").notNull(),
    snowflake: text("snowflake").notNull(),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const discordGuildMemberRelation = relations(DiscordGuildMemberSchema, ({many, one}) => ({
    guildMemberToUserGuildBank: many(userGuildBankSchema),
    guildMembeerToUser: one(DiscordUserSchema)
}))

export const DiscordGuildSchema = schema.table("discord_guild", {
    id: uuid("id").notNull().primaryKey(),
    snowflake: text("snowflake").notNull(),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const discordUserGuildMemberRelation = relations(DiscordUserSchema, ({many}) => ({
    userToGuildMember: many(DiscordGuildMemberSchema),
    commandExecution: many(commandExecutionSchema)
}))

export const commandSchema = schema.table("command", {
    id: uuid("id").notNull().primaryKey(),
    name: text("name").notNull().unique(),
    defaultNumAllowedUses: integer("numAllowedUses").notNull(),
    defaultCooldownInSeconds: integer("cooldownInSeconds").notNull(),
    deleted: boolean("deleted").notNull().default(false),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const commandRelations = relations(commandSchema, ({many}) => ({
    commandToGuildCommand: many(guildCommandSchema)
}))

export const guildCommandSchema = schema.table("guild_command", {
    id: uuid("id").notNull().primaryKey(),
    commandId: uuid("commandId").notNull(),
    discordGuildId: uuid("discordGuildId").notNull(),
    numAllowedUses: integer("numAllowedUses").notNull(),
    cooldownInSeconds: integer("cooldownInSeconds").notNull(),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const guildCommandRelations = relations(guildCommandSchema, ({one}) => ({
    guildCommandToCommand: one(commandSchema),
    discordGuild: one(DiscordGuildSchema)
}))


export const commandExecutionSchema = schema.table("command_execution", {
    id: uuid("id").notNull().primaryKey(),
    commandId: uuid("commandId").notNull(),
    discordGuildMemberId: uuid("discordGuildMemberId").notNull(),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const commandExecutionRelations = relations(commandExecutionSchema, ({many, one}) => ({
    discordGuildMember: one(DiscordGuildMemberSchema),
    commandId: one(commandSchema)
}))

export const userGuildBankSchema = schema.table("user_guild_bank", {
    id: uuid("id").notNull().primaryKey(),
    discordGuildMemberId: uuid("discordGuildId").notNull(),
    balance: integer("balance").notNull().default(0),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const userGuildBankTransactionUserGuildBankRelation = relations(userGuildBankSchema, ({many}) => ({
    userGuildBankToUserGuildBankTransaction: many(userGuildBankTransactionSchema),
    discordGuildMember: many(DiscordGuildMemberSchema),
}))

export const userGuildBankTransactionSchema = schema.table("user_guild_bank_transaction", {
    id: uuid("id").notNull().primaryKey(),
    userGuildBankId: uuid("userGuildBankId").notNull(),
    amount: integer("amount").notNull(),
    createdAt: timestamp("createdAt", {mode: 'date'}).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {mode: 'date'}).defaultNow().notNull()
})

export const transactionToUserGuildBank = relations(userGuildBankTransactionSchema, ({one}) => ({
    userGuildBank: one(userGuildBankSchema)
}))