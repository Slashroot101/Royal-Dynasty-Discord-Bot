import { DiscordUser } from "../../types"
import { createDiscordUser, getDiscordUserBySnowflake } from "./data"
import { randomUUID } from 'crypto'
import logger from "../logger"

export const getOrCreateDiscordUser = async (discordSnowflake: string): Promise<DiscordUser> => {
    logger.debug(`Getting or creating discord user with snowflake ${discordSnowflake}`)
    let discordUser = await getDiscordUserBySnowflake(discordSnowflake)
    if (discordUser.length) {
        logger.debug(`Found discord user with snowflake ${discordSnowflake}`)
        return discordUser[0]
    } else {
        logger.debug(`Creating new discord user with snowflake ${discordSnowflake}`)
        const createdUser = await createDiscordUser({snowflake: discordSnowflake, createdAt: new Date(), updatedAt: new Date(), id: randomUUID()})

        return createdUser[0]
    }
}