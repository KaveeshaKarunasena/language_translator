import express,{Request,Response} from "express";
import mongoose from "mongoose";
import Deck from "./model/User";
import {config} from "dotenv";
config();
import { createUserHistoryController } from "./Controller/createUser";
import { deleteUserHistoryController } from "./Controller/deleteUserHistory";
import { getUserHistoryController } from "./Controller/getUserHistroy";

const app = express();
const PORT = 5001;

app.use(express.json);

app.get("/userhistory", getUserHistoryController);
app.post("/createuserhistory", createUserHistoryController);
app.delete("/history/:title", deleteUserHistoryController);

mongoose.connect(
    "mongodb+srv://it21265242:pUibA7UnWug5rsCP@clusteruserdb.5phqutw.mongodb.net/?retryWrites=true&w=majority"
    ).then(()=> {
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
      });


