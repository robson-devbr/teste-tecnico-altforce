import { Router } from "express";

import { AIController } from "../http/controllers/ai-controller/AIController";
import { SummarizeOrdersController } from "../http/controllers/ai-controller/SummarizeOrdersController";
import { GenerateProductDescriptionController } from "../http/controllers/ai-controller/GenerateProductDescriptionController";
import { DetectAnomaliesController } from "../http/controllers/ai-controller/DetectAnomaliesController";

import { authMiddleware } from "../middlewares/authMiddleware";

const aiRoutes = Router();

const aiController = new AIController();
const summarizeOrdersController = new SummarizeOrdersController();
const generateProductDescriptionController = new GenerateProductDescriptionController();
const detectAnomaliesController = new DetectAnomaliesController();

aiRoutes.post("/suggest-category", authMiddleware, async (req, res) => 
    await aiController.suggestCategory(req, res)
);

aiRoutes.get("/summarize-orders", authMiddleware, async (req, res) => 
    await summarizeOrdersController.handle(req, res)
);

aiRoutes.post("/generate-description", authMiddleware, async (req, res) =>
  await generateProductDescriptionController.handle(req, res)
);

aiRoutes.get("/detect-anomalies", authMiddleware, async (req, res) =>
  await detectAnomaliesController.handle(req, res)
);

console.log('🟢 AI routes Ok');

export default aiRoutes;
