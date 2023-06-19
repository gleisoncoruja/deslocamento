import React from "react";
import Link from "next/link";

import { styled } from "@mui/system";

export const ButtonLink = styled(Link)(({ theme }) => ({
  color: "#FFF",
  background: theme.palette.primary.light,
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));
