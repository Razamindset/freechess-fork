import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

import apiRouter from "./api";

const app = express();

app.use(express.json());

app.use("/static", express.static("dist/public"), express.static("src/public"));

app.use("/api", apiRouter);

app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:3000");
});

module.exports = app;
