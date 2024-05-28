import { ThemeOptions, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    lowKey: Palette["primary"];
  }

  interface PaletteOptions {
    lowKey?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    lowKey: true;
  }
}

const default_theme = createTheme();

export const dark_theme: ThemeOptions = {
  palette: {
    primary: {
      light: "#99C46E",
      main: "#87BD51",
      dark: "#43691D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#FF7961",
      main: "#F44336",
      dark: "#BA000D",
      contrastText: "#000000",
    },
    lowKey: default_theme.palette.augmentColor({
      color: {
        main: "#757575",
      },
      name: "lowKey",
    }),
    background: {
      default: "#1C1D1F",
      paper: "#202123",
    },
    text: {
      primary: "#CCCCCC",
      secondary: "#CCCCCC",
    },
    action: {
      hover: "#18191A",
    },
  },
};
