import React, { useState } from "react";

import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdClose,
  MdMenu,
} from "react-icons/md";

import logoImg from "../../assets/logo.svg";

import {
  Container,
  Header,
  LogImg,
  Title,
  MenuContainer,
  MenuItemLink,
  ToggleMenu,
} from "./styles";

const Aside: React.FC = () => {
  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>

        <LogImg src={logoImg} alt="Logo" />
        <Title>AppFazenda</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
          <MdDashboard />
          Dashboard
        </MenuItemLink>

        <MenuItemLink href="/list/entry-balance">
          <MdArrowUpward />
          Receitas
        </MenuItemLink>

        <MenuItemLink href="/list/exit-balance">
          <MdArrowDownward />
          Despesas
        </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
