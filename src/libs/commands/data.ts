import { notInArray } from "drizzle-orm"
import { database } from "../database"
import { commandSchema } from "../database/schemas"
import { Command, CommandDataObject, CreatedCommandObject } from "../../types"

export const softDeleteCommandsWhereNameNotIn = async (commandNames: string[]) => {
    return await database.update(commandSchema).set({deleted: true}).where(notInArray(commandSchema.name, commandNames)).execute()
}

export const upsertCommand = async (command: CommandDataObject): Promise<CreatedCommandObject[]> => {
    return await database.insert(commandSchema).values(command).onConflictDoUpdate({
        target: commandSchema.name,
        set: {
            defaultCooldownInSeconds: command.defaultCooldownInSeconds,
            defaultNumAllowedUses: command.defaultNumAllowedUses,
            updatedAt: new Date()
        },
    }).returning().execute()
}