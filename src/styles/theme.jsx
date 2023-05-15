import { extendTheme } from "@chakra-ui/react";
import { accordionTheme } from "../components/Accordion";
import { cardTheme } from "../components/Card";
import { buttonTheme } from "../components/Button";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins'`,
  },
  colors: {
    background: "#2F0F5D",
    backgroundText: "#19092e",
    primary: "#0EA293",
    secondary: "#27E1C1",
    pastel: "#F5F3C1",
  },
  components: {
    Accordion: accordionTheme,
    Card: cardTheme,
    Button: buttonTheme,
  },
});

export default theme;
