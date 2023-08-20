import { Request, Response } from "express";
//DB
import db from "../../config/db";
//Logger
import Logger from "../../config/logger";
import TaskModel from "../models/Taskmodel";
import { error } from "console";

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

function fommatted(valor: string) {
  valor = valor.replace(/\./g, "");
  valor = valor.replace(/\,/g, ".");
  return valor;
}
export default class TaskController {
  // mostrar todos os gastos até o momento
  static async ShowTotal(req: Request, res: Response) {
    let resultado = await TaskModel.queryShowTotal();

    res.status(200).json(resultado);
  }

  //SumTotalbyMeseNatureza
  static async getbudgetMes(req: Request, res: Response) {
    let mes = req.body.mes;
    let natureza = req.body.natureza;

    natureza = natureza.replace(/["\[\]]/g, "");
    mes = mes.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.querybudgetMes(mes, natureza);
    res.status(200).json(resultado);
  }
  //SumTotalbyAnoeNatureza
  static async getbudgetAno(req: Request, res: Response) {
    let ano = req.body.ano;
    let natureza = req.body.natureza;

    natureza = natureza.replace(/["\[\]]/g, "");
    ano = ano.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.querybudgetAno(ano, natureza);
    res.status(200).json(resultado);
  }
  //SumTotalbyAnoMesNatureza
  static async getbudgetDataInteira(req: Request, res: Response) {
    const { dataInt } = req.body;
    console.log(dataInt);
    const { natureza } = req.body;

    let resultado = await TaskModel.querybudgetDataInteira(dataInt, natureza);
    res.status(200).json(resultado);
  }

  static async getTotalDespesa(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryTotalDespesa(mes, ano);
    res.status(200).json(resultado);
  }

  static async getTotalReceita(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryTotalReceita(mes, ano);
    res.status(200).json(resultado);
  }
  //
  static async getAnimalReceita(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryAnimalReceita(mes, ano);
    res.status(200).json(resultado);
  }
  //
  static async manyReceitaDataInteira(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");
    // Logger.info(mes, ano);

    let resultado = await TaskModel.queryReceitaDataInt(mes, ano);
    res.status(200).json(resultado);
  }

  static async manyDespesaDataInteira(req: Request, res: Response) {
    let mes = req.body.mes;
    const { ano } = req.body;
    mes = mes.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryDespesaDataInt(mes, ano);
    res.status(200).json(resultado);
  }

  static async manyDespesaAno(req: Request, res: Response) {
    const { ano } = req.body;
    let natureza = req.body.natureza;

    natureza = natureza.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryDespesaAno(ano, natureza);
    res.status(200).json(resultado);
  }
  //SumTotalbyMeseReceita
  static async getReceitaMes(req: Request, res: Response) {
    let mes = req.body.mes;
    let receita = req.body.receita;

    receita = receita.replace(/["\[\]]/g, "");
    mes = mes.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryReceitaMes(mes, receita);
    res.status(200).json(resultado);
  }

  static async getReceitaAno(req: Request, res: Response) {
    let ano = req.body.ano;
    let receita = req.body.receita;

    receita = receita.replace(/["\[\]]/g, "");
    ano = ano.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryReceitaAno(ano, receita);
    res.status(200).json(resultado);
  }

  static async getReceitaData(req: Request, res: Response) {
    let dataInt = req.body.dataInt;
    let receita = req.body.receita;

    receita = receita.replace(/["\[\]]/g, "");
    dataInt = dataInt.replace(/["\[\]]/g, "");

    let resultado = await TaskModel.queryReceitaData(dataInt, receita);
    res.status(200).json(resultado);
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

    receitaLeite =
      Number(fommatted(req.body.valores.R1)) *
      Number(fommatted(req.body.valores.R2));
    receitaTotal = receitaLeite + Number(fommatted(req.body.valores.R3));
    let vendaAnimais = Number(fommatted(req.body.valores.R3));
    let volumeLeite = Number(fommatted(req.body.valores.R1));
    Mes = Mes.replace(/["\[\]]/g, "");

    let Itens!: IItens;
    Itens = req.body.valores;

    let inserirReceita = await TaskModel.InserirReceita(
      Mes,
      Ano,
      volumeLeite,
      vendaAnimais,
      receitaLeite,
      receitaTotal
    );

    if (!inserirReceita) {
      res.json({ msg: false });
      throw error("Erro em inserir receita");
    }

    let dataInt: number;
    const sqlData: string = `select id_data  from te."Datam" d 
                          where d.mes = '${Mes}' and d.ano = '${Ano}' `;

    db.query(sqlData, (err, result) => {
      if (err) {
        Logger.error(err.message);
      } else {
        let resultado = result.rows.length > 1 ? result.rows : result.rows[0];
        dataInt = resultado.id_data;
        const sqlInset: string = `insert into te."LanNatureza"(valor,id_data,natureza)
                                values (${Itens.N1},${dataInt},1),
                                       (${Itens.N2},${dataInt},2)
                                       (${Itens.N3},${dataInt},3)
                                       (${Itens.N4},${dataInt},4)
                                       (${Itens.N5},${dataInt},5)
                                       (${Itens.N6},${dataInt},6)
                                       (${Itens.N7},${dataInt},7)
                                       (${Itens.N8},${dataInt},8)
                                       (${Itens.N9},${dataInt},9)
                                       (${Itens.N10},${dataInt},10)
                                       (${Itens.N11},${dataInt},11)
                                       (${Itens.N12},${dataInt},12)
                                       (${Itens.N13},${dataInt},13)
                                       (${Itens.N14},${dataInt},14)
                                       (${Itens.N15},${dataInt},15)
                                       (${Itens.N16},${dataInt},16)
                                       (${Itens.N17},${dataInt},17)`;

        if (dataInt > 42) {
          db.query(sqlInset, (err, result) => {
            if (err) {
              Logger.error(err.message);
              res.json({ msg: false });
            } else {
              res.json({ msg: true });
            }
          });
        } else {
          res.json({ msg: false });
        }
      }
    });
  }
}
