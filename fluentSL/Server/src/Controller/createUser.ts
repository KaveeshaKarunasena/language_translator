import { Request, Response } from "express";
import Deck from "../model/User";

export async function createUserHistoryController(req: Request, res: Response) {
  const newuser = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newuser.save();
  res.json(createdDeck);
}