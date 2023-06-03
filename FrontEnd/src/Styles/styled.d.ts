import "styled-components";

// tipagem customizada
declare module "styled-components" {
  //sobreescrevendo o tema padrao do styled.components
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;
      tertiary: string;

      white: string;
      black: string;
      gray: string;

      success: string;
      info: string;
      warning: string;
    };
  }
}
