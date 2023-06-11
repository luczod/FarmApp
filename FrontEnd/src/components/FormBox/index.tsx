import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import listreceitas from "../../utils/receitas";
import listnaturezas from "../../utils/naturezas";
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
interface IInput {
  ids: number;
  nome: string;
}

const FormBox: React.FC = () => {
  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "90%" }}>
      <form method="POST" action="http://localhost:5000/api/AddValor">
        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3" background="success">
                <MDBTypography tag="h5" className="mb-0" color="white">
                  Natureza
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
                        name={(index + 1).toString()}
                        className="form-control"
                        type="number"
                        placeholder="valor"
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
                  Receitas
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {listreceitas.map((itens, index) => {
                  return (
                    <MDBInputGroup
                      key={index + 1}
                      textBefore={itens.nome}
                      className="mb-3"
                    >
                      <input
                        name={itens.ids}
                        className="form-control"
                        type="number"
                        placeholder="valor"
                      />
                    </MDBInputGroup>
                  );
                })}
                <MDBInputGroup textBefore="Receita Total" className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="valor"
                    value={"45"}
                    readOnly
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
