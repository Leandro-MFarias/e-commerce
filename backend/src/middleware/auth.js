import { decodedToken } from "../utils/jwt.js";

export async function auth(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Acesso negado sem Token" });
  }

  try {
    const decoded = decodedToken(token);

    if (!decoded.id) {
      return res.status(401).json({ message: "Acesso Negado usuário não encontrado" });
    }

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
}
