import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const SearchAndNewContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1rem",
  },
}));
