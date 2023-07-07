import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import restrictedKeys from "../../utils/restrictkeyCode";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "react-toastify/dist/components";

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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPeriodo({ ...periodo, [e.target.name]: e.target.value });
  }
  const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let msg = await AddValor(periodo, Mes, Ano);
    console.log(msg.data);
    if (msg.data) {
      toast.success("adiconado com sucesso", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    } else {
      toast.error("Houve algum erro", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    //window.location.reload();
  };
  return (
    <div className="mx-auto lg-5" style={{ maxWidth: "100%" }}>
      <form onSubmit={submit}>
        <MDBRow>
          <MDBCol lg="6" className="lg-4">
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
                        required
                      />
                    </MDBInputGroup>
                  );
                })}

                <div className="d-flex justify-content-center"></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          {/*  */}

          <MDBCol lg="6" className="lg-4">
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
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="000.000,00"
                    required
                  />
                </MDBInputGroup>
                <MDBInputGroup textBefore="Preço do Leite" className="mb-3">
                  <input
                    name="R2"
                    className="form-control"
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="0,00"
                    required
                  />
                </MDBInputGroup>

                <MDBInputGroup textBefore="Venda de Animais" className="mb-3">
                  <input
                    name="R3"
                    className="form-control"
                    type="text"
                    step="0.01"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="000.000,00"
                    required
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
