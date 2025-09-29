import { userRegisterSchema, userLoginSchema } from "../types/authSchema.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import * as authModel from "../models/auth.model.js";
import { sendPasswordResetEmail } from "../utils/email.js";

export async function registerUser(data) {
  const { fullname, email, password } = userRegisterSchema.parse(data);

  const existingUser = await authModel.findByEmail(email);

  if (existingUser) {
    const error = new Error("Esse email já foi cadastrado");
    error.status = 400;
    throw error;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await authModel.create({
    fullname,
    email,
    password: hashPassword,
  });

  return user;
}

export async function signIn(data) {
  const { email, password } = userLoginSchema.parse(data);

  const user = await authModel.findByEmail(email);

  if (!user) {
    const error = new Error("Usuário não encontrado!");
    error.status = 400;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error("Senha incorreta");
    error.status = 400;
    throw error;
  }

  return user;
}

export async function forgotPassword(email) {
  if (!email) {
    const error = new Error("Coloque um email");
    error.status = 400;
    throw error;
  }

  const user = await authModel.findByEmail(email);
  if (!user) {
    const error = new Error("Email não encontrado");
    error.status = 404;
    throw error;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpire = new Date(Date.now() + 3600000);

  await authModel.updateResetToken(email, resetToken, resetTokenExpire);

  const resetUrl = `https://e-commerce-gamer-omega.vercel.app/reset-password?token=${resetToken}&email=${email}`;

  await sendPasswordResetEmail(email, resetUrl);
}

export async function resetPassword(data) {
  const { email, token, password } = data;

  if (!email || !token || !password) {
    const error = new Error("Dados inválidos!");
    error.status = 400;
    throw error;
  }

  const user = await authModel.findByEmail(email);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.status = 404;
    throw error;
  }

  if (user.resetToken !== token) {
    const error = new Error("Token inválido");
    error.status = 400;
    throw error;
  }

  if (user.resetTokenExpire < new Date()) {
    const error = new Error("Token expirado");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newData = {
    password: hashedPassword,
    resetToken: null,
    resetTokenExpire: null,
  };

  await authModel.updatePassword(email, newData);

  return { message: "Senha atualizada com sucesso!!" };
}
