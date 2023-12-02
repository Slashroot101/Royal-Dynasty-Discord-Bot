import { UserGuildBank } from "../../types"
import logger from "../logger"
import { createTransactionHistory } from "../userGuildBankTransactions/business"
import { addToUserBank, createUserBank, getUserBank } from "./data"

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

export const incrementUserBank = async (discordUserGuildBankId: string, amount: number): Promise<UserGuildBank> => {
  logger.debug(`Adding ${amount} to user guild bank for discordUserGuildBankId ${discordUserGuildBankId}`)
  const userBank = await addToUserBank(discordUserGuildBankId, amount)
  logger.debug(`Added ${amount} to user guild bank for discordUserGuildBankId ${discordUserGuildBankId}`)
  logger.debug(`Adding to transaction audit table`)
  await createTransactionHistory(discordUserGuildBankId, amount)
  logger.debug(`Added to transaction audit table`)
  return userBank[0]
}