import { eq } from 'drizzle-orm'
import {database} from '../database'
import { userGuildBankSchema } from '../database/schemas'
import { CreatedUserGuildBank, UserGuildBank } from '../../types'
import { randomUUID } from 'crypto'

export const getUserBank = async (discordGuildMemberId: string): Promise<UserGuildBank[]> => {
  return database.select().from(userGuildBankSchema).where(eq(userGuildBankSchema.discordGuildMemberId, discordGuildMemberId)).execute()
}

export const createUserBank = async (discordGuildMemberId: string): Promise<UserGuildBank[]> => {
  return database.insert(userGuildBankSchema).values({discordGuildMemberId, id: randomUUID(), createdAt: new Date(), updatedAt: new Date(), balance:0}).returning().execute()
}