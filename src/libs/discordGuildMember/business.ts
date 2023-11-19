import { DiscordGuildMember } from "../../types"
import logger from "../logger"
import { createDiscordGuildMember, getDiscordGuildMemberByGuildUserId } from "./data"

export const getOrCreateDiscordGuild = async (discordSnowflake: string, discordUserId: string, discordGuildId: string): Promise<DiscordGuildMember> => {
    logger.debug(`Getting or creating discord guild with snowflake ${discordSnowflake}`)
    let discordGuildMember = await getDiscordGuildMemberByGuildUserId(discordSnowflake)
    if (discordGuildMember.length) {
        logger.debug(`Found discord guild with snowflake ${discordSnowflake}`)
        return discordGuildMember[0]
    } else {
        logger.debug(`Creating new discord guild with snowflake ${discordSnowflake}`)
        const createdGuild = await createDiscordGuildMember(discordUserId, discordGuildId, discordSnowflake)

        return createdGuild[0]
    }
}