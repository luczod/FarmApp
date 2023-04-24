import { Request, Response } from "express";
//DB
import db from "../../config/db";
//Logger
import Logger from "../../config/logger";

export default class TaskController {
  static ShowData(req: Request, res: Response) {
    const sql: string = `SELECT * FROM te."Datam" where  ano = 2021`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err.stack);
      } else {
        let resultado = result.rows;
        Logger.info(result.rowCount);
        res.status(200).json(resultado);
      }
    });

    return;
  }
}
