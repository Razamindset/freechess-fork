import express from "express";
import apiRouter from "./api";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || null;

app.use(express.json());

// Secret key middleware for API routes
app.use("/api", (req, res, next) => {
    const secret = req.headers["x-api-secret"];

    if (secret !== SECRET_KEY) {
        return res.status(403).json({ error: "Forbidden: Invalid secret key" });
    }

    next(); // Secret is correct → move to actual API router
});

app.use("/api", apiRouter);

app.get("/", (_req, res) => {
    return res.send("Welcome to chess game review server. Author:Wintrcat");
});

app.get("/ping", (_req, res) => {
    if (!SECRET_KEY) {
        return res.send("Server is having some issues");
    }
    return res.send("pong 🏓");
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});

module.exports = app;
