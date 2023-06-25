import React from "react";
import Link from "next/link";

import { styled } from "@mui/system";

export const ButtonLink = styled(Link)(({ theme }) => ({
  display: "flex",
  color: "#FFF",
  background: theme.palette.primary.light,
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));
