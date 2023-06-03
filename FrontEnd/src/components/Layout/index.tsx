import React, { ReactNode } from "react";
import { Grid } from "./styles";
import MainHearders from "../MainHearders";
import Aside from "../Aside";
import Content from "../Content";

// componente funcional "React.FC"
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Grid>
        <Aside />
        <MainHearders />
        <Content>{children}</Content>
      </Grid>
    </>
  );
};

export default Layout;
