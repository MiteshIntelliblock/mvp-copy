import { extendTheme } from "@chakra-ui/react";

// rubik
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/300.css";

// synce
import "@fontsource/syne/700.css";
import "@fontsource/syne/600.css";
import "@fontsource/syne/500.css";
import "@fontsource/syne/400.css";

// poppins
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/300.css";

const fonts = {
  body: "Poppins",
  heading: "Poppins",
  rubik: "rubik",
  syne: "syne",
};

const colors = {
  darkGreen: "#398501",
  lightGreen: "#93C601",
  BNZorange: "#FF8616",
  fontColor: "#3E3E3E",
  disableGrey: "#616161",
  tableColor: "#6B88B0",
  bnzRed: "#FF492D",
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts,
  colors,
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: colors.darkGreen,
            borderColor: colors.darkGreen,
          },
          _hover: {
            bg: "transparent",
            borderColor: colors.darkGreen,
          },
          _active: {
            bg: colors.darkGreen,
            borderColor: colors.darkGreen,
          },
          _disabled: {
            bg: colors.disableGrey,
            borderColor: colors.disableGrey,
          },
        },
        label: {
          fontSize: "0.875rem",
        },
      },
    },
    Table: {
      variants: {
        simple: {
          table: {
            border: "1px solid #D9D9D9",
          },
          thead: {
            backgroundColor: colors.tableColor,
          },
          th: {
            borderColor: "white",
            color: "white",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "1rem",
            borderRight: "2px solid white",
            padding: "0.62rem",
          },
          td: {
            borderColor: "#D9D9D9",
            fontSize: "0.875rem",
            padding: "0.88rem 0.62rem",
            borderBottom: "1px solid",
          },
        },
      },
    },
    Tabs: {
      variants: {
        line: {
          tab: {
            color: colors.fontColor,
            fontSize: "0.875rem",
            fontWeight: "600",
            bg: "transparent",
            _selected: {
              borderColor: colors.darkGreen,
              color: colors.darkGreen,
            },
          },
        },
      },
    },
  },
});

export default theme;
