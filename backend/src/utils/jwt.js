import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

function getSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não definido!");
  }
  return process.env.JWT_SECRET;
}

function generateAcessToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, getSecret(), {
    expiresIn: "7d",
  });
}

export function createSessionCookies(res, user) {
  // Armazeno o token gerado
  const accessToken = generateAcessToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function decodedToken(token) {
  return jwt.verify(token, getSecret());
}

export function logoutSession(req, res) {
  res.cookie("accessToken", null, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
    maxAge: 0,
  });

  res.status(200).json({ message: "Logout realizado com sucesso" });
}
