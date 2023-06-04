import React, { useMemo } from "react";
// useMemo decora o valor

import { Container, Profile, UserName, MenuItemLink } from "./styles";
import { MdAdd } from "react-icons/md";

const MainHeader: React.FC = () => {
  return (
    <Container>
      <MenuItemLink href="/Adicionar">
        <MdAdd />
        Adicionar
      </MenuItemLink>
    </Container>
  );
};

export default MainHeader;
