import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import restrictedKeys from "../../utils/restrictkeyCode";

import listnaturezas from "../../utils/naturezas";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInputGroup,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

interface IMes {
  Mes: string;
  Ano: string;
}

async function AddValor(
  valores: { Mes: string; Ano: string },
  mes: string,
  ano: string
) {
  valores.Mes = mes;
  valores.Ano = ano;
  const data1 = axios.post("http://localhost:5000/api/AddValor", {
    valores,
  });
  return data1;
}

const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  // Add more keys to restrict as needed

  if (!restrictedKeys.includes(e.code)) {
    e.preventDefault();
  }
};

const FormBox: React.FC<IMes> = ({ Mes, Ano }) => {
  const [periodo, setPeriodo] = useState({ Mes, Ano });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPeriodo({ ...periodo, [e.target.name]: e.target.value });
  }
  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    AddValor(periodo, Mes, Ano);
    //window.location.reload();
  };
  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "90%" }}>
      <form onSubmit={submit}>
        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3" background="success">
                <MDBTypography tag="h5" className="mb-0" color="white">
                  Natureza (%)
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {listnaturezas.map((itens, index) => {
                  return (
                    <MDBInputGroup
                      key={index}
                      textBefore={itens}
                      className="mb-3"
                    >
                      <input
                        name={"N" + (index + 1)}
                        className="form-control"
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        type="text"
                        placeholder="00,00"
                      />
                    </MDBInputGroup>
                  );
                })}

                <div className="d-flex justify-content-center"></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          {/*  */}

          <MDBCol md="6" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3" background="success">
                <MDBTypography tag="h5" className="mb-0" color="white">
                  Receitas (R$)
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBInputGroup textBefore="Volume do Leite" className="mb-3">
                  <input
                    name="R1"
                    className="form-control"
                    type="flaot"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="000.000,00"
                  />
                </MDBInputGroup>
                <MDBInputGroup textBefore="Preço do Leite" className="mb-3">
                  <input
                    name="R2"
                    className="form-control"
                    type="number"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="0,00"
                  />
                </MDBInputGroup>

                <MDBInputGroup textBefore="Venda de Animais" className="mb-3">
                  <input
                    name="R3"
                    className="form-control"
                    type="number"
                    step="0.01"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="000.000,00"
                  />
                </MDBInputGroup>
                <MDBBtn type="submit" size="lg" color="success" noRipple block>
                  Adicionar
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </form>
    </div>
  );
};

export default FormBox;
