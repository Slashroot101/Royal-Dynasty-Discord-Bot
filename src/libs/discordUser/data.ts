import { InferInsertModel, eq } from "drizzle-orm"
import { DiscordUserSchema } from "../database/schemas"
import { database } from "../database"
import { CreatedDiscordUser, DiscordUser } from "../../types"
import logger from "../logger"

export const createDiscordUser = async (discordUser: CreatedDiscordUser) => {
    logger.debug(`Creating discord user with id ${discordUser.id}`)
    return await database.insert(DiscordUserSchema).values(discordUser).returning().execute()
}

export const getDiscordUserBySnowflake = async (discordUserId: string): Promise<DiscordUser[]> => {
    logger.debug(`Querying for discord user with id ${discordUserId}`)
    return await database.select().from(DiscordUserSchema).where(eq(DiscordUserSchema.snowflake, discordUserId)).limit(1).execute()
}