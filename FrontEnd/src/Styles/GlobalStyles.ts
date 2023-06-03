import { createGlobalStyle } from "styled-components";

// todo o css valerá para toda a aplicacao
export default createGlobalStyle`
   *{
        margin: 0;
        padding:0;
        box-sizing:border-box;
    }

    html,body,#root{
        height: 100%;
    }
    
    *, button, input{
        border: 0;
        outline: 0;
        font-family:'Helvetica',sans-serif;
    }
    
    button{
        cursor: pointer;
    }
    
`;
