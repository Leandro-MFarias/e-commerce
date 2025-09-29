export function isAdmin(req, res, next) {
  if (req.role !== "ADMIN") {
    return res.status(401).json({ message: "Acesso apenas para Admin!" });
  }

  next();
}
