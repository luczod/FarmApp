import Spreadsheet from "react-spreadsheet";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import FormBox from "../../components/FormBox";

import SelectInput from "../../components/SelectInput";
import ConatentHeader from "../../components/ContentHeader";

import listOfMonths from "../../utils/months";
import listOfYears from "../../utils/years";
import { Container } from "./styles";

const AdcionarBox: React.FC = () => {
  const word = new Date().toLocaleString("default", { month: "long" });
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);

  const [monthSelected, setMonthSelected] = useState<string>(capitalized);
  const [yearSelected, setYearSelected] = useState<number>(2022);
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

  return (
    <>
      <ConatentHeader
        title={`Adicionar - ${monthSelected} de ${yearSelected}`}
        lineColor="#d3d01a"
      >
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
      <FormBox Mes={monthSelected} Ano={yearSelected.toString()} />
    </>
  );
};
export default AdcionarBox;
