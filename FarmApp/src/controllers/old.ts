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

    valores.N1 = (Number(fommatted(Itens.N1)) / 100) * receitaTotal;
    valores.N2 = (Number(fommatted(Itens.N2)) / 100) * receitaTotal;
    valores.N3 = (Number(fommatted(Itens.N3)) / 100) * receitaTotal;
    valores.N4 = (Number(fommatted(Itens.N4)) / 100) * receitaTotal;
    valores.N5 = (Number(fommatted(Itens.N5)) / 100) * receitaTotal;
    valores.N6 = (Number(fommatted(Itens.N6)) / 100) * receitaTotal;
    valores.N7 = (Number(fommatted(Itens.N7)) / 100) * receitaTotal;
    valores.N8 = (Number(fommatted(Itens.N8)) / 100) * receitaTotal;
    valores.N9 = (Number(fommatted(Itens.N9)) / 100) * receitaTotal;
    valores.N10 = (Number(fommatted(Itens.N10)) / 100) * receitaTotal;
    valores.N11 = (Number(fommatted(Itens.N11)) / 100) * receitaTotal;
    valores.N12 = (Number(fommatted(Itens.N12)) / 100) * receitaTotal;
    valores.N13 = (Number(fommatted(Itens.N13)) / 100) * receitaTotal;
    valores.N14 = (Number(fommatted(Itens.N14)) / 100) * receitaTotal;
    valores.N15 = (Number(fommatted(Itens.N15)) / 100) * receitaTotal;
    valores.N16 = (Number(fommatted(Itens.N16)) / 100) * receitaTotal;
    valores.N17 = (Number(fommatted(Itens.N17)) / 100) * receitaTotal;

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
