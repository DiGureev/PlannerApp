import express from 'express';
import path from "path";
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/tasks.route.js';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));

app.listen(process.env.PORT || 3001, () => {
  console.log(`run on ${process.env.PORT || 3001}`);
});

app.use("/api/planner", router);
// app.use("/products", p_router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

