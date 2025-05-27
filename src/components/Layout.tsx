import { ReactNode } from "react";
import styled from "@emotion/styled";
import { HistoryIcon } from "./HistoryIcon";

const LayoutContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <HistoryIcon />
      {children}
    </LayoutContainer>
  );
};
