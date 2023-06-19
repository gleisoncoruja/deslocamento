import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const FormContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  gap: "1rem",
  border: "1px solid black",
  borderRadius: "0.5rem",
  width: "100%",
  maxWidth: "48rem",
  margin: "0 auto",
});

export const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const FormTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

export const FieldContent = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const FormActionContent = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  justifyContent: "flex-end",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
