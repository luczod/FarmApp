import { Request, Response } from "express";
//DB
import db from "../../config/db";
//Logger
import Logger from "../../config/logger";
import { log } from "console";

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

  // mostrar todos os gastos até o momento
  static async ShowTotal(req: Request, res: Response) {
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data`;

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

  //SumTotalbyMeseNatureza
  static async getTotalMes(req: Request, res: Response) {
    let mes = req.body.mes;
    let natureza = req.body.natureza;

    natureza = natureza.replace(/["\[\]]/g, "");
    mes = mes.replace(/["\[\]]/g, "");

    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where n.nomenatureza in (${natureza}) and d.mes in (${mes})`;
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
    let ano = req.body.ano;
    let natureza = req.body.natureza;

    natureza = natureza.replace(/["\[\]]/g, "");
    ano = ano.replace(/["\[\]]/g, "");

    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where n.nomenatureza in (${natureza}) and d.ano in (${ano})`;
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
  //multiplos valores de uma vez
  static async getTotalMult(req: Request, res: Response) {
    const { dataInt } = req.body; //'M.O Eventual','BST'
    let { natureza } = req.body;
    natureza = natureza.replace(/["\[\]]/g, "");
    console.log(natureza);

    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where n.nomenatureza in (${natureza}) and d.id_data = ${dataInt}`;
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
