import { UserGuildBank } from "../../types"
import logger from "../logger"
import { createUserBank, getUserBank } from "./data"

export const getOrCreateUserGuildBank = async (discordGuildMemberId: string): Promise<UserGuildBank> => {
  logger.debug(`Getting or creating user guild bank for discordGuildMemberId ${discordGuildMemberId}`)
  const userGuildBank = await getUserBank(discordGuildMemberId)
  if (userGuildBank.length === 0) {
    logger.debug(`No user guild bank found for discordGuildMemberId ${discordGuildMemberId}. Creating one.`)
    const createdUserBank = await createUserBank(discordGuildMemberId)
    return createdUserBank[0]
  }
  logger.debug(`User guild bank found for discordGuildMemberId ${discordGuildMemberId}. Returning.`)
  return userGuildBank[0]
}