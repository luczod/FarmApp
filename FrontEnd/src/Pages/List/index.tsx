import React, { useMemo, useState, useEffect } from "react";
import { Container, Content, Filters } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import FinancesItem from "../../components/FinancesItem";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";

import formatCurrency from "../../utils/formatCurrency";
import formatNumber from "../../utils/formatNumber";
import listOfMonths from "../../utils/months";
import listOfYears from "../../utils/years";

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  tagColor: string;
}

let gain!: [];

interface IitensReceitas {
  nomereceita: string;
  valor: string;
}

interface IitensDespesas {
  nomenatureza: string;
  valor: string;
}

async function getReceitas(mes: string, ano: number) {
  const data1 = axios.post("http://localhost:5000/api/manyReceita", {
    mes: `"['${mes}']"`,
    ano,
  });
  return data1;
}

async function getDespesas(mes: string, ano: number) {
  const data1 = axios.post("http://localhost:5000/api/manyDespesa", {
    mes: `"['${mes}']"`,
    ano,
  });
  return data1;
}

// componente funcional "React.FC"
const List: React.FC = () => {
  const word = new Date().toLocaleString("default", { month: "long" });
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

  const { tipo } = useParams();
  const [data, setData] = useState<IData[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(capitalized);
  const [yearSelected, setYearSelected] = useState<number>(2022);
  // new Date().getFullYear()

  const pageData = useMemo(() => {
    return tipo === "entry-balance"
      ? {
          title: "Receitas",
          lineColor: "#6AD547",
        }
      : {
          title: "Despesas",
          lineColor: "#ED370F",
        };
  }, [tipo]);

  const years = useMemo(() => {
    return listOfYears.map((years) => {
      return {
        value: years,
        label: years,
      };
    });
  }, []);
  //
  const months = useMemo(() => {
    return listOfMonths.map((month) => {
      return {
        value: month,
        label: month,
      };
    });
  }, []);

  const handleMonthSelected = (month: string) => {
    try {
      setMonthSelected(month);
    } catch {
      throw new Error("invalid month value. Is accept 0 - 24.");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error("invalid year value. Is accept integer numbers.");
    }
  };

  useEffect(() => {
    const { title } = pageData;

    if (title === "Receitas") {
      getReceitas(monthSelected, yearSelected).then((e) => {
        if (e.data) {
          let valueFormat!: string;
          gain = e.data;
          const formattedData = gain.map((itens: IitensReceitas) => {
            if (itens.nomereceita === "Volume Leite") {
              valueFormat = formatNumber(Number(itens.valor)) + " Litros";
            } else {
              valueFormat = formatCurrency(Number(itens.valor));
            }
            return {
              id: v4(),
              description: itens.nomereceita,
              amountFormatted: valueFormat,
              tagColor: "#6AD547",
            };
          });
          setData(formattedData);
        } else {
          setData([]);
        }
      });
    }

    if (title === "Despesas") {
      getDespesas(monthSelected, yearSelected).then((e) => {
        if (e.data) {
          gain = e.data;
          const formattedData = gain.map((itens: IitensDespesas) => {
            return {
              id: v4(),
              description: itens.nomenatureza,
              amountFormatted: formatCurrency(Number(itens.valor)),
              tagColor: "#ED370F",
            };
          });
          setData(formattedData);
        } else {
          setData([]);
        }
      });
    }

    //
  }, [pageData, monthSelected, yearSelected]);

  //console.log(data[0].dateFormatted);
  //
  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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
      </ContentHeader>
      {/* <Filters>
        <button
          type="button"
          className={`
                    tag-filter 
                    tag-filter-recurrent
                    ${
                      frequencyFilterSelected.includes("recorrente") &&
                      "tag-actived"
                    }`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>

        <button
          type="button"
          className={`
                    tag-filter 
                    tag-filter-eventual
                    ${
                      frequencyFilterSelected.includes("eventual") &&
                      "tag-actived"
                    }`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
      </Filters> */}
      <Content>
        {data.map((item) => (
          <FinancesItem
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
