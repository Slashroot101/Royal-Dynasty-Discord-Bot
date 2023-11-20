import { DiscordGuild } from "../../types"
import logger from "../logger"
import { createDiscordGuild, getDiscordGuildBySnowflake } from "./data"

export const getOrCreateDiscordGuild = async (discordSnowflake: string | null,): Promise<DiscordGuild | null> => {
    if(discordSnowflake === null) return null
    logger.debug(`Getting or creating discord guild with snowflake ${discordSnowflake}`)
    let discordGuild = await getDiscordGuildBySnowflake(discordSnowflake)
    if (discordGuild.length) {
        logger.debug(`Found discord guild with snowflake ${discordSnowflake}`)
        return discordGuild[0]
    } else {
        logger.debug(`Creating new discord guild with snowflake ${discordSnowflake}`)
        const createdGuild = await createDiscordGuild( discordSnowflake) as DiscordGuild[]

        return createdGuild[0]
    }
}