import { Request, Response } from "express";
import Deck from "../model/User";

export async function deleteUserHistoryController(req: Request, res: Response) {
  const titleuser = req.params.title;
  const titledeleteuser = await Deck.findByIdAndDelete(titleuser);
  res.json(titledeleteuser);
}