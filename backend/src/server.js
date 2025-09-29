import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://e-commerce-gamer-omega.vercel.app",
];

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.use("/api", routes);

app.listen(PORT, console.log(`Servidor rodando na porta: ${PORT}`));