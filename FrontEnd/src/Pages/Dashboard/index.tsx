import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Container } from "./styles";

import SelectInput from "../../components/SelectInput";
import ConatentHeader from "../../components/ContentHeader";
import CardBox from "../../components/CardBox";
import BarChartBox from "../../components/BarChartBox";

import axios from "axios";

import listOfMonths from "../../utils/months";
import listOfYears from "../../utils/years";
import listNatureza from "../../utils/naturezas";
import { Content } from "./styles";

async function TotalReceita(mes: string, ano: number) {
  const data1 = axios.post("http://localhost:5000/api/TotalReceita", {
    mes: `"['${mes}']"`,
    ano,
  });
  return data1;
}

async function TotalDespesas(mes: string, ano: number) {
  const data1 = axios.post("http://localhost:5000/api/TotalDespesa", {
    mes: `"['${mes}']"`,
    ano,
  });
  return data1;
}

async function manyDespesas(mes: string, ano: number) {
  const data1 = axios.post("http://localhost:5000/api/manyDespesa", {
    mes: `"['${mes}']"`,
    ano,
  });
  return data1;
}

async function manyDespesasAno(ano: number, natureza: string) {
  const data1 = axios.post("http://localhost:5000/api/manyDespesaAno", {
    ano: `${ano}`,
    natureza: `"['${natureza}']"`,
  });
  return data1;
}

interface IData {
  nameX: string;
  valor: number;
}

interface IitensDespesas {
  nomenatureza: string;
  valor: string;
}

interface IitensDespesasAno {
  nomenatureza: string;
  valor: string;
  receitatotal: string;
  mes: string;
}

// componente funcional "React.FC"
// call ConatentHeader com children   SelectInput
const Dashboard: React.FC = () => {
  const word = new Date().toLocaleString("default", { month: "long" });
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

  const [monthSelected, setMonthSelected] = useState<string>(capitalized);
  const [naturezaSelected, setNaturezaSelected] = useState<string>("");

  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );
  const [gain, setGain] = useState<number>(0);
  const [exapense, setExpense] = useState<number>(0);
  const [data, setData] = useState<IData[]>([]);
  const [dataAno, setDataAno] = useState<IData[]>([]);

  const years = useMemo(() => {
    return listOfYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: month,
        label: month,
      };
    });
  }, []);

  const naturezas = useMemo(() => {
    return listNatureza.map((natureza, index) => {
      return {
        value: natureza,
        label: natureza,
      };
    });
  }, []);

  const totalBalance = gain - exapense;

  const handleMonthSelected = useCallback((month: string) => {
    try {
      setMonthSelected(month);
    } catch {
      throw new Error("invalid month value. Is accept 0 - 24.");
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error("invalid year value. Is accept integer numbers.");
    }
  }, []);

  const handleNaturezaSelected = useCallback((natureza: string) => {
    try {
      setNaturezaSelected(natureza);
    } catch {
      throw new Error("invalid natureza.");
    }
  }, []);

  useEffect(() => {
    TotalDespesas(monthSelected, yearSelected).then((e) => {
      if (e.data) {
        let total!: number;
        total = Number(e.data.sum);
        setExpense(total);
      } else {
        setExpense(0);
      }
    });

    TotalReceita(monthSelected, yearSelected).then((e) => {
      if (e.data) {
        let total!: number;
        total = Number(e.data.sum);
        setGain(total);
      } else {
        setGain(0);
      }
    });

    manyDespesas(monthSelected, yearSelected).then((e) => {
      if (e.data) {
        let gasto!: [];
        let formatValue!: number;
        gasto = e.data;
        console.log(gasto);
        gasto = e.data;
        const formattedData = gasto.map((itens: IitensDespesas) => {
          formatValue = (Number(itens.valor) * 100) / gain;
          formatValue = Number(formatValue.toFixed(2));
          return {
            nameX: itens.nomenatureza,
            valor: formatValue,
          };
        });
        setData(formattedData);
      } else {
        setData([]);
      }
    });
  }, [monthSelected, yearSelected]);

  useEffect(() => {
    manyDespesasAno(yearSelected, naturezaSelected).then((e) => {
      if (e.data) {
        let gastoAno!: [];
        let formatValue!: number;
        gastoAno = e.data;
        console.log(gastoAno);
        gastoAno = e.data;
        const formattedData = gastoAno.map((itens: IitensDespesasAno) => {
          formatValue =
            (Number(itens.valor) * 100) / Number(itens.receitatotal);
          formatValue = Number(formatValue.toFixed(2));
          return {
            nameX: itens.mes.slice(0, 3),
            valor: formatValue,
          };
        });
        setDataAno(formattedData);
      } else {
        setDataAno([]);
      }
    });
  }, [naturezaSelected, yearSelected]);

  return (
    <>
      <Container>
        <ConatentHeader title="Dashboard" lineColor="#d3d01a">
          <SelectInput
            options={months}
            onChange={(e) => handleMonthSelected(e.target.value)}
            defaultValue={monthSelected}
          />
          <SelectInput
            options={years}
            onChange={(e) => handleYearSelected(e.target.value)}
            defaultValue={yearSelected}
          />
        </ConatentHeader>
        <Content>
          <CardBox
            title="Saldo"
            color="#FFFFFF"
            amount={totalBalance}
            footerlabel="atualizado com base nas entradas e saídas"
            icon="dolar"
          />
          <CardBox
            title="Receitas"
            color="#FFFFFF"
            amount={gain}
            footerlabel="atualizado com base nas entradas e saídas"
            icon="arrowUp"
          />
          <CardBox
            title="Despesas"
            color="#FFFFFF"
            amount={exapense}
            footerlabel="atualizado com base nas entradas e saídas"
            icon="arrowDown"
          />

          <BarChartBox
            data={data}
            titulo={`${monthSelected} de ${yearSelected} - Despesas em porcentagem(%)`}
            fillColor="#d3d01a"
          />
          <ConatentHeader lineColor="#D9D9D9">
            <SelectInput
              options={naturezas}
              onChange={(e) => handleNaturezaSelected(e.target.value)}
              defaultValue={naturezaSelected}
            />
          </ConatentHeader>

          <BarChartBox
            data={dataAno}
            titulo={`Histórico de ${naturezaSelected} em ${yearSelected}`}
            fillColor="#08A81E"
          />
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
