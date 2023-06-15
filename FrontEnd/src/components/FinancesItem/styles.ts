import styled, { keyframes } from "styled-components";
//

interface ITagProps {
  color: string;
}
const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;
export const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};
  list-style: none;
  border-radius: 5px;
  margin: 10px 0;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  animation: ${animate} 0.5s ease;

  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-left: 10px;
  }

  > div span {
    font-size: 22px;
    font-weight: 500;
  }
  @media (max-width: 850px) {
    white-space: nowrap;

    flex-direction: column;
    > div span {
      font-size: 25px;
    }
    > h3 {
      font-size: 25px;
      padding-left: 10px;
    }
  }

  @media (max-width: 450px) {
    flex-direction: column;

    > div span {
      max-width: 310px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      font-size: 22px;
    }
    > h3 {
      font-size: 25px;
      padding-left: 10px;
    }
  }
`;
export const Tag = styled.div<ITagProps>`
  width: 13px;
  height: 60%;

  background-color: ${(props) => props.color};

  position: absolute;
  left: 0;
`;
