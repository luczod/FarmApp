import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Container } from "./styles";

import SelectInput from "../../components/SelectInput";
import ConatentHeader from "../../components/ContentHeader";
import CardBox from "../../components/CardBox";
import BarChartBox from "../../components/BarChartBox";
import LineChartBox from "../../components/LineChartBox";

import axios from "axios";

import listOfMonths from "../../utils/months";
import listOfYears from "../../utils/years";
import listNatureza from "../../utils/naturezas";
import formatCurrency from "../../utils/formatCurrency";
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
  receitatotal: string;
}

interface IitensDespesasAno {
  nomenatureza: string;
  valor: string;
  receitatotal: string;
  mes: string;
}

let totalBalance: number | string;

let formatValue2: number;

// componente funcional "React.FC"
// call ConatentHeader com children   SelectInput
const Dashboard: React.FC = () => {
  const word = new Date().toLocaleString("default", { month: "long" });
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

  const [monthSelected, setMonthSelected] = useState<string>(capitalized);
  const [naturezaSelected, setNaturezaSelected] =
    useState<string>("M.O Efetiva");

  const [yearSelected, setYearSelected] = useState<number>(2022);
  // new Date().getFullYear()
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

  totalBalance = (exapense * 100) / gain;
  totalBalance = totalBalance.toFixed(2);
  if (totalBalance === "NaN") {
    totalBalance = "0%";
  } else {
    totalBalance = totalBalance + "%";
  }

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
        let formatValue: number;
        let gastos: [];
        gastos = e.data;
        console.log(gastos);

        const formattedData = gastos.map((itens: IitensDespesas) => {
          formatValue =
            (Number(itens.valor) * 100) / Number(itens.receitatotal);
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
        let gastoAno: [];
        gastoAno = e.data;
        console.log(gastoAno);
        const formattedData = gastoAno.map((itens: IitensDespesasAno) => {
          formatValue2 =
            (Number(itens.valor) * 100) / Number(itens.receitatotal);
          formatValue2 = Number(formatValue2.toFixed(2));
          return {
            nameX: itens.mes.slice(0, 3),
            valor: formatValue2,
          };
        });
        setDataAno(formattedData);
      } else {
        setDataAno([]);
      }
    });
    console.log(yearSelected, naturezaSelected);
  }, [yearSelected, naturezaSelected]);

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
            titulo="Orçamento"
            color="#FFFFFF"
            amount={totalBalance}
            footerlabel="atualizado com base nas entradas e saídas"
            icon="dolar"
          />
          <CardBox
            titulo="Receitas"
            color="#FFFFFF"
            amount={formatCurrency(gain)}
            footerlabel="atualizado com base nas entradas e saídas"
            icon="arrowUp"
          />
          <CardBox
            titulo="Despesas"
            color="#FFFFFF"
            amount={formatCurrency(exapense)}
            footerlabel="atualizado com base nas entradas e saídas"
            icon="arrowDown"
          />

          <BarChartBox
            data={data}
            titulo={`${monthSelected} de ${yearSelected} - Despesas em porcentagem(%)`}
            fillColor="#d3d01a"
          />
        </Content>
        <ConatentHeader lineColor="#D9D9D9">
          <SelectInput
            options={naturezas}
            onChange={(e) => handleNaturezaSelected(e.target.value)}
            defaultValue={naturezaSelected}
          />
        </ConatentHeader>
        <Content>
          <LineChartBox
            data={dataAno}
            titulo={`${yearSelected} - Histórico de ${naturezaSelected}(%) `}
            fillColor="#08A81E"
          />
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
