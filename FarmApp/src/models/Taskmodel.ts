import db from "../../config/db";
import Logger from "../../config/logger";

export default class TaskModel {
  static async queryShowTotal() {
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data`;
    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async InserirReceita(
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

  static async queryTotalReceita(mes: string, ano: string) {
    const sql: string = `select sum(valor) from te."LanReceita" lr 
                        join te."Receita" r 
                          on lr.receita  = r.id_receita 
                        join te."Datam" d 
                          on lr.iddata  = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano} and lr.receita = 4;`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async querybudgetMes(mes: string, natureza: string) {
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where n.nomenatureza in (${natureza}) and d.mes in (${mes})`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async querybudgetAno(ano: string, natureza: string) {
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where n.nomenatureza in (${natureza}) and d.ano in (${ano})`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async queryTotalDespesa(mes: string, ano: string) {
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano};`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async querybudgetDataInteira(dataInt: string, natureza: string) {
    const sql: string = `select sum(valor) from te."LanNatureza" ln2 
                        join te."Natureza" n 
                          on ln2.natureza = n.id_natureza 
                        join te."Datam" d 
                          on ln2.id_data = d.id_data
                        where n.nomenatureza in (${natureza}) and d.ano in (${dataInt})`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async queryReceitaDataInt(mes: string, ano: string) {
    const sql: string = `select nomereceita, valor from te."LanReceita" lr  
                        join te."Receita" r   
                          ON lr.receita  = r.id_receita 
                        join te."Datam" d 
                          ON lr.iddata = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano};`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async queryDespesaDataInt(mes: string, ano: string) {
    const sql: string = `select nomenatureza,valor from te."LanNatureza" ln2
                        join te."Natureza" n   
                          ON ln2.natureza  = n.id_natureza 
                        join te."Datam" d 
                          ON ln2.id_data  = d.id_data
                        where d.mes = ${mes} and d.ano = ${ano};`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async queryDespesaAno(ano: string, natureza: string) {
    const sql: string = `select nomenatureza, ln2.valor, lr.valor as receitaTotal, d.mes from te."LanNatureza" ln2
                        join te."Natureza" n   
                          ON ln2.natureza  = n.id_natureza 
                        join te."Datam" d 
                          ON ln2.id_data  = d.id_data
                        join te."LanReceita" lr  
                          ON lr.iddata = d.id_data 
                        where n.nomenatureza = ${natureza} and d.ano = ${ano} and lr.receita = 4;`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async queryReceitaMes(mes: string, receita: string) {
    const sql: string = `select sum(valor) from te."LanReceita" lr  
                          join te."Receita" r   
                            ON lr.receita  = r.id_receita 
                          join te."Datam" d 
                            ON lr.iddata = d.id_data
                          where r.nomereceita in (${receita}) and d.mes in (${mes})`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async queryReceitaAno(ano: string, receita: string) {
    const sql: string = `select sum(valor) from te."LanReceita" lr  
                          join te."Receita" r   
                            ON lr.receita  = r.id_receita 
                          join te."Datam" d 
                            ON lr.iddata = d.id_data
                          where r.nomereceita in (${receita}) and d.ano in (${ano})`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }

  static async queryReceitaData(dataInt: string, receita: string) {
    const sql: string = `select sum(valor) from te."LanReceita" lr  
                          join te."Receita" r   
                            ON lr.receita  = r.id_receita 
                          join te."Datam" d 
                            ON lr.iddata = d.id_data
                          where r.nomereceita in (${receita}) and d.id_data in (${dataInt})`;

    try {
      let resultado = await db.query(sql);
      Logger.info(resultado.rows.length);

      resultado =
        resultado.rows.length > 1 ? resultado.rows : resultado.rows[0];

      return resultado;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      // we'll proceed, but let's report it
      Logger.error(message);

      return "";
    }
  }
}
