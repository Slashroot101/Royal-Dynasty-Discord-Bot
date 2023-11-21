import { and, between, eq } from "drizzle-orm"
import { database } from "../database"
import { commandExecutionSchema } from "../database/schemas"
import { randomUUID } from "crypto"

export const getUserCommandExecutionForGuild = (memberId: string, commandId: string, lookbackSeconds) => {
    return database.select()
    .from(commandExecutionSchema)
    .where(
        and(
            eq(commandExecutionSchema.discordGuildMemberId, memberId),
            eq(commandExecutionSchema.commandId, commandId),
            between(commandExecutionSchema.createdAt, new Date(Date.now() - lookbackSeconds * 1000), new Date()
        )
    ))
    .execute()
}

export const insertCommandExecution = async (commandId: string, memberId: string) => {
    return await database.insert(commandExecutionSchema).values({
        commandId,
        discordGuildMemberId: memberId,
        createdAt: new Date(),
        id:randomUUID()
    }).execute()
}