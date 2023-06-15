import React from "react";
import { Container, TitleContainer, Controller } from "./styles";

interface IContentHeaderProps {
  title?: string;
  lineColor: string;
  children: React.ReactNode;
}
// componente funcional "React.FC"
// the children from  ConatentHeader is put in Controolers
const ConatentHeader: React.FC<IContentHeaderProps> = ({
  title,
  lineColor,
  children,
}) => {
  return (
    <>
      <Container>
        {title && (
          <TitleContainer lineColor={lineColor}>
            <h1>{title}</h1>
          </TitleContainer>
        )}

        <Controller>
          {/* chama a funcao selectinput tres vezes */}
          {children}
        </Controller>
      </Container>
    </>
  );
};

export default ConatentHeader;
