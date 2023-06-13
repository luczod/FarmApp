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
let receitaLeite: number;
let receitaTotal: number;
interface LooseObject {
  [key: string]: number;
}
let valores: LooseObject = {};

interface IItens {
  Mes: string;
  Ano: string;
  N1: string;
  N2: string;
  N3: string;
  N4: string;
  N5: string;
  N6: string;
  N7: string;
  N8: string;
  N9: string;
  N10: string;
  N11: string;
  N12: string;
  N13: string;
  N14: string;
  N15: string;
  N16: string;
  N17: string;
  R1: string;
  R2: string;
  R3: string;
}
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
    const sql: string = `select nomenatureza, ln2.valor, lr.valor as receitaTotal, d.mes from te."LanNatureza" ln2
                        join te."Natureza" n   
                          ON ln2.natureza  = n.id_natureza 
                        join te."Datam" d 
                          ON ln2.id_data  = d.id_data
                        join te."LanReceita" lr  
                          ON lr.iddata = d.id_data 
                        where n.nomenatureza = ${natureza} and d.ano = ${ano} and lr.receita = 4;`;

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
  //
  static async AddValores(req: Request, res: Response) {
    let { Mes, Ano } = req.body.valores;
    let dataInt!: string;

    receitaLeite = Number(req.body.valores.R1) * Number(req.body.valores.R2);
    receitaTotal = receitaLeite + Number(req.body.valores.R3);
    Mes = Mes.replace(/["\[\]]/g, "");

    let Itens!: IItens;
    Itens = req.body.valores;

    valores.N1 = (Number(Itens.N1) / 100) * receitaTotal;
    valores.N2 = (Number(Itens.N2) / 100) * receitaTotal;
    valores.N3 = (Number(Itens.N3) / 100) * receitaTotal;
    valores.N4 = (Number(Itens.N4) / 100) * receitaTotal;
    valores.N5 = (Number(Itens.N5) / 100) * receitaTotal;
    valores.N6 = (Number(Itens.N6) / 100) * receitaTotal;
    valores.N7 = (Number(Itens.N7) / 100) * receitaTotal;
    valores.N8 = (Number(Itens.N8) / 100) * receitaTotal;
    valores.N9 = (Number(Itens.N9) / 100) * receitaTotal;
    valores.N10 = (Number(Itens.N10) / 100) * receitaTotal;
    valores.N11 = (Number(Itens.N11) / 100) * receitaTotal;
    valores.N12 = (Number(Itens.N12) / 100) * receitaTotal;
    valores.N13 = (Number(Itens.N13) / 100) * receitaTotal;
    valores.N14 = (Number(Itens.N14) / 100) * receitaTotal;
    valores.N15 = (Number(Itens.N15) / 100) * receitaTotal;
    valores.N16 = (Number(Itens.N16) / 100) * receitaTotal;
    valores.N17 = (Number(Itens.N17) / 100) * receitaTotal;

    console.log(valores.N5, receitaTotal);

    const sql: string = `select id_data  from te."Datam" d 
                          where d.mes = '${Mes}' and d.ano = '${Ano}' `;
    db.query(sql, (err, result) => {
      if (err) {
        Logger.error(err.message);
      } else {
        let resultado = result.rows.length > 1 ? result.rows : result.rows[0];
        dataInt = resultado.id_data;
      }
    });
  }
}
