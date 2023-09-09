import { Request, Response } from "express";
import HistoryModel from "../model/History";
const historyService = require('../service/historyservice')

const createUserHistory= async (req: Request, res: Response) => {
    try{
        console.log(req.body)
        const {title,description} = req.body;
        
        const newHistory = await historyService.addHistory(title,description)
        res.status(200).send(newHistory);
    }
    catch(err){
        res.status(400).send({err:"not created"});
    }   
}

const getUserHistory = async(req: Request, res: Response) => {
    console.log("here")
    try{
        await HistoryModel
        .find()
        .then(history => res.status(200).send(history))
    
      }catch(err){
        res.status(404).send({ err: 'There is no history found' });
      }
}

const deleteUserHistory = async (req: Request, res: Response) => {

    try{
        console.log("delete")
        const {_id} = req.params;
        await HistoryModel.findByIdAndDelete(_id)
        .then(() =>res.status(200).send({message:'History deleted successfuly'}) )
    }
    catch(err){
        res.status(404).send({ err: 'Something went wrong' });
    }
    
  }

  module.exports={
    createUserHistory,
    getUserHistory,
    deleteUserHistory
  }
