import { CreatedGuildCommand } from "../../types";
import logger from "../logger";

export const getDiscordGuildCommandsById = async (guildId): Promise<CreatedGuildCommand[]> => {
    logger.debug(`Getting discord guild commands with id ${guildId}`)
    const guildCommands = await getDiscordGuildCommandsById(guildId)
    logger.debug(`Completed getting discord guild commands with id ${guildId}`)

    return guildCommands
}