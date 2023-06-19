import { List, styled } from "@mui/material";
import Link from "next/link";
import { ListProps } from "./interface";

export const StyledLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
}));

export const LinkText = styled("p")(({ open }: ListProps) => ({
  opacity: open ? 1 : 0,
}));

export const StyledList = styled(List)({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  gap: "1rem",
});

export const StyledListItem = styled(List, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }: ListProps) => ({
  display: "block",
  color: active ? "#1976d2" : "initial",
}));
