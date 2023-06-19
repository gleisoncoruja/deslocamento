import { createTheme, createStyles } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

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

const styled = createStyles({ theme });

export default styled;
