import { randomUUID } from "crypto"
import { Command, CreatedCommandObject } from "../../types"
import logger from "../logger"
import { softDeleteCommandsWhereNameNotIn, upsertCommand } from "./data"


export const upsertCommands = async (commands: Command[]): Promise<CreatedCommandObject[]> => {
    logger.debug(`Soft deleting commands where name not in [${commands}]`)
    await softDeleteCommandsWhereNameNotIn(commands.map(x => x.data.name))
    logger.debug(`Completed deleting commands where name not in [${commands}]`)

    logger.debug(`Upserting commands [${commands}]`)
    let promises: Promise<CreatedCommandObject[]>[] = []
    for (const command of commands){
        promises.push(upsertCommand({
            name: command.data.name,
            defaultCooldownInSeconds: command.defaultCooldownInSeconds || 0,
            defaultNumAllowedUses: command.numAllowedUses || 0,
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: randomUUID()
        }))
    }
    logger.debug(`Completed upserting commands [${commands}]`)

    logger.debug(`Waiting for command promises to complete`)
    const commandValues = await Promise.all(promises)
    logger.debug(`Completed waiting for command promises to complete`)
    return commandValues.map(x => x[0])
}