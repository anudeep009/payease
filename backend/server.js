import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import accountRoutes from "./routes/account.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use("/api/v1", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});