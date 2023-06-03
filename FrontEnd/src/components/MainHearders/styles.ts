import styled from "styled-components";

export const Container = styled.div`
  grid-area: MH;

  background-color: ${(props) => props.theme.colors.black};

  display: flex;
  justify-content: end;
  align-items: center;

  padding: 0 10px;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

export const MenuItemLink = styled.a`
  color: ${(props) => props.theme.colors.info};
  text-decoration: none;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const MenuItemButton = styled.button`
  font-size: 16px;
  color: ${(props) => props.theme.colors.info};

  border: none;
  background: none;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const Welcome = styled.h3``;

export const UserName = styled.span``;
