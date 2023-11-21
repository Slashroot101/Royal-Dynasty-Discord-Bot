import { eq } from "drizzle-orm"
import { database } from "../database"
import { guildCommandSchema } from "../database/schemas"
import { GuildCommand } from "../../types"

export const getDiscordGuildCommandsById = async (guildId: string): Promise<GuildCommand[]> => {
    return await database.select().from(guildCommandSchema).where(eq(guildCommandSchema.discordGuildId, guildId)).execute()
}