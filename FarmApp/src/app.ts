//Env
require("dotenv").config();
import express from "express";
import config from "config";
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

//json midleware
app.use(express.json());

//cors
app.use(cors(corsOptions));
//DB
import db from "../config/db";

//routes
import router from "./router";
// const router = require("./router");

//Logger
import Logger from "../config/logger";

//middleware
// para todas rotas, saber quem está solicitando
import morganMiddleware from "./middleware/helpers";

app.use(morganMiddleware);

app.use("/api/", router);

//app port
const port = config.get<number>("port");

app.listen(port, async () => {
  db.connect((err: any) => {
    if (err) {
      Logger.error("connection error: ", err.message);
    } else {
      Logger.info("connected");
    }
  });
  Logger.info(`run in http://localhost:${port}/`);
});
