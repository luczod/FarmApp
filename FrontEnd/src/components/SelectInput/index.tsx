import React from "react"; //{ ReactNode }
import { Container } from "./styles";
import "bootstrap/dist/css/bootstrap.css";

interface ISelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  defaultValue?: string | number;
}

// componente funcional "React.FC"
// tipando o children como um node do react
// checa o que tem entre as tags do componets
const SelectInput: React.FC<ISelectInputProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <>
      <Container>
        <select
          className="select"
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Container>
    </>
  );
};

export default SelectInput;
