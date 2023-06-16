import db from "../../config/db";
import Logger from "../../config/logger";

export default class TaskModel {
  static async InserirValores(
    Mes: string,
    Ano: string,
    volumeLeite: number,
    vendaAnimais: number,
    receitaLeite: number,
    receitaTotal: number
  ) {
    let dataInt: number;
    const sqlData: string = `select id_data  from te."Datam" d 
                          where d.mes = '${Mes}' and d.ano = '${Ano}' `;

    try {
      db.query(sqlData, (err, result) => {
        if (err) {
          Logger.error(err.message);
        } else {
          let resultado = result.rows.length > 1 ? result.rows : result.rows[0];
          dataInt = resultado.id_data;
          const sqlReceita: string = `insert into te."LanReceita"(valor,iddata,receita)
                                values (${volumeLeite},${dataInt},1),
                                       (${receitaLeite},${dataInt},2),
                                       (${vendaAnimais},${dataInt},3),
                                       (${receitaTotal},${dataInt},4)`;

          db.query(sqlReceita, (err, result) => {
            if (err) {
              Logger.error(err.message);
            }
          });
        }
      });
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);
      return false;
    }
    return true;
  }
}
