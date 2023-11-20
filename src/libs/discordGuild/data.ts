import { randomUUID } from "crypto"
import { CreatedDiscordGuild, DiscordGuild } from "../../types"
import { database } from "../database"
import { DiscordGuildSchema } from "../database/schemas"
import logger from "../logger"
import { eq } from "drizzle-orm"

export const createDiscordGuild = async (snowflake: string): Promise<CreatedDiscordGuild[]> => {
    logger.debug(`Creating discord guild with snowflake ${snowflake}`)
    return await database.insert(DiscordGuildSchema).values({snowflake, createdAt: new Date(), updatedAt: new Date(), id: randomUUID(),}).returning().execute()
}

export const getDiscordGuildBySnowflake = async (snowflake: string): Promise<DiscordGuild[]> => {
    logger.debug(`Querying for discord guild with snowflake ${snowflake}`)
    return await database.select().from(DiscordGuildSchema).where(eq(DiscordGuildSchema.snowflake, snowflake)).limit(1).execute()
}