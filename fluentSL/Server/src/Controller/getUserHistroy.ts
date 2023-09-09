import { Request, Response } from "express";
import Deck from "../model/User";

export async function getUserHistoryController(req: Request, res: Response) {
  const { title } = req.params;
  const titleget = await Deck.findById(title);
  res.json(titleget);
}