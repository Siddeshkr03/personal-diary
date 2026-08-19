import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Personal Diary backend is running",
  });
});

app.listen(5000, () => {
  console.log("Personal Diary backend running on http://localhost:5000");
});

export default app;