import { Router } from "express";
import analyse from "./lib/analysis";
import { ReportRequestBody } from "./lib/types/RequestBody";

const router = Router();

router.post("/report", async (req, res) => {
    let { positions }: ReportRequestBody = req.body;

    console.log("A request was recieved");

    if (!positions) {
        return res.status(400).json({ message: "Missing parameters." });
    }

    // Generate report
    try {
        var results = await analyse(positions);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to generate report." });
    }

    res.json({ results });
});

export default router;
