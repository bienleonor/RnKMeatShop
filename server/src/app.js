import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.json({ name: "RnK MeatShop POS API", status: "ok" });
});

app.get("/health", (req, res) => {
	res.json({ status: "ok", service: "pos-api" });
});

app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).json({ error: "Internal server error" });
});

export default app;