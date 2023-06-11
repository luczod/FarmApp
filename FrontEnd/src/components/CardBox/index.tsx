import React, { useMemo } from "react";

import dolarImg from "../../assets/dolar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";

import { Container } from "./styles";

interface ICardBoxProps {
  titulo: string;
  amount: number | string;
  footerlabel: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
  color: string;
}

const CardBox: React.FC<ICardBoxProps> = ({
  titulo,
  amount,
  footerlabel,
  icon,
  color,
}) => {
  const iconSelected = useMemo(() => {
    switch (icon) {
      case "dolar":
        return dolarImg;
      case "arrowUp":
        return arrowUpImg;
      case "arrowDown":
        return arrowDownImg;
      default:
        return undefined;
    }
  }, [icon]);

  return (
    <Container color={color}>
      <span>{titulo}</span>

      <h1>{amount}</h1>

      <small>{footerlabel}</small>
      <img src={iconSelected} alt={titulo} />
    </Container>
  );
};

export default CardBox;
