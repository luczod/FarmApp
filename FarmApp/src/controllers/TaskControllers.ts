import { Request, Response } from "express";
//DB
import db from "../../config/db";
//Logger
import Logger from "../../config/logger";

export default class TaskController {
  //getalldatas
  static async ShowData(req: Request, res: Response) {
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
  //SumTotalbyMeseNatureza
  static async getTotalMes(req: Request, res: Response) {
    const mes = req.body.mes;
    const natureza = req.body.natureza;
    const sql: string = `select sum from  te.fn_totMes('${natureza}','${mes}')`;
    db.query(sql, (err, result) => {
      if (err) {
        Logger.error(err.message);
      } else {
        let resultado = result.rows.length > 1 ? result.rows : result.rows[0];
        Logger.info(result.rows.length);
        res.status(200).json(resultado);
      }
    });
  }
  //SumTotalbyAnoeNatureza
  static async getTotalAno(req: Request, res: Response) {
    const ano = req.body.ano;
    console.log(ano);
    const natureza = req.body.natureza;
    const sql: string = `select sum from  te.fn_totAno('${natureza}',${ano})`;
    db.query(sql, (err, result) => {
      if (err) {
        Logger.error(err.message);
      } else {
        let resultado = result.rows.length > 1 ? result.rows : result.rows[0];
        Logger.info(result.rows.length);
        res.status(200).json(resultado);
      }
    });
  }
  //SumTotalbyAnoeMeseNatureza
  static async getTotalDataInteira(req: Request, res: Response) {
    const { dataInt } = req.body;
    console.log(dataInt);
    const { natureza } = req.body;
    const sql: string = `select sum from  te.fn_totDataInteira('${natureza}',${dataInt})`;
    db.query(sql, (err, result) => {
      if (err) {
        Logger.error(err.message);
      } else {
        let resultado = result.rows.length > 1 ? result.rows : result.rows[0];
        Logger.info(result.rows.length);
        res.status(200).json(resultado);
      }
    });
  }
}
