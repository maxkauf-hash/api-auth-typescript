import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next(); // Passe à l'étape suivante si l'utilisateur est authentifié
  }
  res.status(401).json({ message: "Unauthorized" });
};
