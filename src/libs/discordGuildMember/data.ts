import { randomUUID } from "crypto"
import { database } from "../database"
import { DiscordGuildMemberSchema } from "../database/schemas"
import logger from "../logger"
import { eq } from "drizzle-orm"
import { CreatedDiscordGuildMember, DiscordGuildMember } from "../../types"

export const createDiscordGuildMember = async (discordUserId: string, discordGuildId: string, snowflake: string): Promise<CreatedDiscordGuildMember[]> => {
    logger.debug(`Creating discord guild member with id ${discordUserId}`)
    return await database.insert(DiscordGuildMemberSchema).values({discordUserId, discordGuildId, createdAt: new Date(), updatedAt: new Date(), id: randomUUID(), snowflake,}).returning().execute()
}

export const getDiscordGuildMemberByGuildUserId = async (snowflake: string): Promise<DiscordGuildMember[]> => {
    logger.debug(`Querying for discord guild member with snowflake ${snowflake}`)
    return await database.select().from(DiscordGuildMemberSchema).where(eq(DiscordGuildMemberSchema.snowflake, snowflake)).limit(1).execute()
}