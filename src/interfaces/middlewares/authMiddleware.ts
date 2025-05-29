import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token não fornecido!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as any; 
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido ou expirado!" });
  }
};
