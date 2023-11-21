import { Command, RateLimitResponse } from "../../types"
import logger from "../logger"
import { getUserCommandExecutionForGuild, insertCommandExecution } from "./data"

export const isUserRateLimited = async (memberId: string, command: Command): Promise<RateLimitResponse> => {
    if(command.defaultCooldownInSeconds === 0) return {rateLimited: false, nextAvailableAt: new Date(0) }
    let isLimited = true
    logger.debug(`Checking if member ${memberId} is rate limited`)
    const invocations = await getUserCommandExecutionForGuild(memberId, command.id!, command.defaultCooldownInSeconds)
    if(invocations.length < (command?.numAllowedUses ?? 0)) isLimited = false
    logger.debug(`Used command ${invocations} times in the last ${command.defaultCooldownInSeconds} seconds`)
    /**
     * Next available when the last invocation is older than the cooldown
     */
    return {rateLimited: isLimited, nextAvailableAt: invocations.length ? new Date(invocations[0].createdAt.getTime() + ((command!.defaultCooldownInSeconds!) * 1000)) : new Date()}
}

export const saveUserExecutedCommand = async (memberId: string, commandId: string): Promise<void> => {
    logger.debug(`Inserting command execution`)
    await insertCommandExecution(memberId, commandId)
    logger.debug(`Completed inserting command execution`)
}