import { randomUUID } from "crypto"
import { database } from "../database"
import { userGuildBankTransactionSchema } from "../database/schemas"

export const createTransaction = async (userGuildBankId, amount) => {
  return database.insert(userGuildBankTransactionSchema).values({userGuildBankId, amount, id: randomUUID(), createdAt: new Date(), updatedAt: new Date()}).returning().execute()
}