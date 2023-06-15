import styled from "styled-components";

export const Container = styled.div`
  grid-area: CT;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};

  padding: 25px;

  height: calc(100vh - 70px);
  overflow-y: scroll;

  /* barra de rollagem */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #026014;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`;
