import express,{ Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import mongoose from "mongoose";
const historyRoute = require('./routes/historyroute');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use("/userhistory", historyRoute);
// app.use("/getHistory", getUserHistory);
// app.use("/history/:_id", deleteUserHistory);

mongoose.connect(
    "mongodb+srv://it21258794:it21258794@cluster0.gbxgola.mongodb.net/?retryWrites=true&w=majority"
    ).then(()=> {
        console.log('MongoDB connected');
        app.on('error', (e) => {
          console.log(e)
        });
        app.listen(PORT, () => {
          console.log(`TypeScript with Express
         http://localhost:${PORT}/`);
        });
      });



