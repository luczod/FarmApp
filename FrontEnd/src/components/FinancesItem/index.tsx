import React from "react";
import { Container, Tag } from "./styles";

interface IFinancesItem {
  tagColor: string;
  title: string;
  amount: string;
}

// componente funcional "React.FC"
// tipando o children como um node do react
// checa o que tem entre as tags do componets
const FinancesItem: React.FC<IFinancesItem> = ({ tagColor, title, amount }) => {
  return (
    <>
      <Container>
        <Tag color={tagColor} />
        <div>
          <span>{title}</span>
        </div>
        <h3>{amount}</h3>
      </Container>
    </>
  );
};

export default FinancesItem;
