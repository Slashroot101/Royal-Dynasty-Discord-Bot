import { and, asc, between, desc, eq } from "drizzle-orm"
import { database } from "../database"
import { commandExecutionSchema } from "../database/schemas"
import { randomUUID } from "crypto"

export const getUserCommandExecutionForGuild = (memberId: string, commandId: string, lookbackSeconds: number) => {
    return database.select()
    .from(commandExecutionSchema)
    .where(
        and(
            eq(commandExecutionSchema.discordGuildMemberId, memberId),
            eq(commandExecutionSchema.commandId, commandId),
            between(commandExecutionSchema.createdAt, new Date(Date.now() - lookbackSeconds * 1000), new Date()
        )
    ))
    .orderBy(asc(commandExecutionSchema.createdAt))
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