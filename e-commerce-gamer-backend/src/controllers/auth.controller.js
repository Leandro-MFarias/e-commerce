import * as authService from "../services/auth.service.js";
import { createSessionCookies } from "../utils/jwt.js";

export async function registerUserController(req, res) {
  try {
    const result = await authService.registerUser(req.body);

    createSessionCookies(res, result);

    return res.status(201).json({ message: "Conta criada" });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function signInController(req, res) {
  try {
    const result = await authService.signIn(req.body);

    createSessionCookies(res, result);

    return res.status(200).json({ message: "Bem vindo!" });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);

    return res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const result = await authService.resetPassword(req.body)
    
    return res.status(200).json(result)
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}
