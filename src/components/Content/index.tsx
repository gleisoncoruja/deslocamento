import { TableContainer, Paper } from "@mui/material";
import { ReactNode } from "react";

import styled from "@emotion/styled";

export default function PageContent({ children }: { children: ReactNode }) {
  return (
    <TableContainer
      component={Paper}
      style={{ width: "100%", overflow: "hidden" }}
    >
      {children}
    </TableContainer>
  );
}
