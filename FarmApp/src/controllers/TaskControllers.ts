import { Request, Response } from "express";
//DB
import db from "../../config/db";
//Logger
import Logger from "../../config/logger";
/**
 Eu posso armazenar separado pegando apenas o target.value
 ou criar uma tabela cheia de input
 os inputs terão handlechange
 */
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
  static async getbudgetMes(req: Request, res: Response) {
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
  static async getbudgetAno(req: Request, res: Response) {
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
  //SumTotalbyAnoMesNatureza
  static async getbudgetDataInteira(req: Request, res: Response) {
    const { dataInt } = req.body;
    console.log(dataInt);
    const { natureza } = req.body;
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where n.nomenatureza in (${natureza}) and d.ano in (${dataInt})`;

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

  static async getTotalNatureza(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano};`;

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

  static async getTotalReceita(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");
    const sql: string = `select sum(valor) from te."LanReceita" lr 
                        join te."Receita" r 
                          on lr.receita  = r.id_receita 
                        join te."Datam" d 
                          on lr.iddata  = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano} and lr.receita = 4;`;

    db.query(sql, (err, result) => {
      if (err) {
        Logger.error(err.message);
      } else {
        let resultado = result.rows.length > 1 ? result.rows : result.rows[0];
        res.status(200).json(resultado);
        Logger.info(result.rows.length);
      }
    });
  }
  //
  static async manyReceitaDataInteira(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");
    Logger.info(mes, ano);
    const sql: string = `select nomereceita, valor from te."LanReceita" lr  
                        join te."Receita" r   
                          ON lr.receita  = r.id_receita 
                        join te."Datam" d 
                          ON lr.iddata = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano};`;

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

  static async manyDespesaDataInteira(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");
    const sql: string = `select nomenatureza,valor from te."LanNatureza" ln2
                        join te."Natureza" n   
                          ON ln2.natureza  = n.id_natureza 
                        join te."Datam" d 
                          ON ln2.id_data  = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano};`;

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

  static async manyDespesaAno(req: Request, res: Response) {
    const { ano } = req.body;
    let natureza = req.body.natureza;

    natureza = natureza.replace(/["\[\]]/g, "");
    const sql: string = `select nomenatureza,valor, d.mes from te."LanNatureza" ln2
                        join te."Natureza" n   
                          ON ln2.natureza  = n.id_natureza 
                        join te."Datam" d 
                          ON ln2.id_data  = d.id_data
                        where n.nomenatureza = ${natureza} and d.ano = ${ano};`;

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
  //SumTotalbyMeseReceita
  static async getReceitaMes(req: Request, res: Response) {
    let mes = req.body.mes;
    let receita = req.body.receita;

    receita = receita.replace(/["\[\]]/g, "");
    mes = mes.replace(/["\[\]]/g, "");

    const sql: string = `select sum(valor) from te."LanReceita" lr  
                          join te."Receita" r   
                            ON lr.receita  = r.id_receita 
                          join te."Datam" d 
                            ON lr.iddata = d.id_data
                          where r.nomereceita in (${receita}) and d.mes in (${mes})`;
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

  static async getReceitaAno(req: Request, res: Response) {
    let ano = req.body.ano;
    let receita = req.body.receita;

    receita = receita.replace(/["\[\]]/g, "");
    ano = ano.replace(/["\[\]]/g, "");

    const sql: string = `select sum(valor) from te."LanReceita" lr  
                          join te."Receita" r   
                            ON lr.receita  = r.id_receita 
                          join te."Datam" d 
                            ON lr.iddata = d.id_data
                          where r.nomereceita in (${receita}) and d.ano in (${ano})`;
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

  static async getReceitaData(req: Request, res: Response) {
    let dataInt = req.body.dataInt;
    let receita = req.body.receita;

    receita = receita.replace(/["\[\]]/g, "");
    dataInt = dataInt.replace(/["\[\]]/g, "");

    const sql: string = `select sum(valor) from te."LanReceita" lr  
                          join te."Receita" r   
                            ON lr.receita  = r.id_receita 
                          join te."Datam" d 
                            ON lr.iddata = d.id_data
                          where r.nomereceita in (${receita}) and d.id_data in (${dataInt})`;
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
  //
  static async budgetAdd(req: Request, res: Response) {
    let dataInt = req.body.dataInt;
    let receita = req.body.receita;

    receita = receita.replace(/["\[\]]/g, "");
    dataInt = dataInt.replace(/["\[\]]/g, "");

    const sql: string = `select sum(valor) from te."LanReceita" lr  
                          join te."Receita" r   
                            ON lr.receita  = r.id_receita 
                          join te."Datam" d 
                            ON lr.iddata = d.id_data
                          where r.nomereceita in (${receita}) and d.id_data in (${dataInt})`;
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
