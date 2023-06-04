import React, { useMemo } from "react";

import dolarImg from "../../assets/dolar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";
import formatCurrency from "../../utils/formatCurrency";

import { Container } from "./styles";

interface ICardBoxProps {
  title: string;
  amount: number;
  footerlabel: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
  color: string;
}

const CardBox: React.FC<ICardBoxProps> = ({
  title,
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
      <span>{title}</span>
      <h1>{formatCurrency(amount)}</h1>
      <small>{footerlabel}</small>
      <img src={iconSelected} alt={title} />
    </Container>
  );
};

export default CardBox;
