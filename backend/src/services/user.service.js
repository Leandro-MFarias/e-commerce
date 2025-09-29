import * as userModel from "../models/user.model.js"

export async function getProfile(userId) {
  const result = await userModel.findById(userId)

  if (!result) {
    const error = new Error("Usuário não encontrado")
    error.status = 400
    throw error
  }
  
  return result
}