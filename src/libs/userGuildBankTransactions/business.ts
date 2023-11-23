import logger from "../logger"
import { createTransaction } from "./data"

export const createTransactionHistory = async (userGuildBankId: string, amount: number) => {
  logger.debug(`Creating transaction history for userGuildBankId ${userGuildBankId} with amount ${amount}`)
  await createTransaction(userGuildBankId, amount)
}