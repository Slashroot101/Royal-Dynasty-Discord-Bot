import { Command, RateLimitResponse } from "../../types"
import logger from "../logger"
import { getUserCommandExecutionForGuild, insertCommandExecution } from "./data"

export const isUserRateLimited = async (memberId: string, command: Command): Promise<RateLimitResponse> => {
    if (command.defaultCooldownInSeconds === 0) {
        return { rateLimited: false, nextAvailableAt: new Date() }; // Return current date for clarity
    }

    logger.debug(`Checking if member ${memberId} is rate limited`);
    const invocations = await getUserCommandExecutionForGuild(memberId, command.id!, command.defaultCooldownInSeconds ?? 0);

    const isLimited = !(invocations.length === 0 || invocations.length < (command?.numAllowedUses ?? 0));
    logger.debug(`Used command ${invocations.length} times in the last ${command.defaultCooldownInSeconds} seconds`);

    // Calculate next available time
    const nextAvailableAt = isLimited && invocations.length ?
        new Date(invocations[0].createdAt.getTime() + (command!.defaultCooldownInSeconds! * 1000)) :
        new Date(); // Or return null if you prefer

    return { rateLimited: isLimited, nextAvailableAt };
};

export const saveUserExecutedCommand = async (memberId: string, commandId: string): Promise<void> => {
    logger.debug(`Inserting command execution`)
    await insertCommandExecution(memberId, commandId)
    logger.debug(`Completed inserting command execution`)
}