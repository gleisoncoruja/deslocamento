import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "white",
          background: "#1565c0",
        },
        arrow: {
          color: "#1565c0",
        },
      },
    },
  },
});
