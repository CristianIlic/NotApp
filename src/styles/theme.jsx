import { extendTheme } from "@chakra-ui/react";
import { accordionTheme } from "../components/Accordion";
import { cardTheme } from "../components/Card";
import { buttonTheme } from "../components/Button";
import { MultiSelectTheme } from "chakra-multiselect";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins'`,
  },
  colors: {
    background: "#222831",
    backgroundText: "#393E46",
    primary: "#00ADB5",
    primaryHover: "#037a80",
    secondary: "#EEEEEE",
  },
  components: {
    Accordion: accordionTheme,
    Card: cardTheme,
    Button: buttonTheme,
    MultiSelect: MultiSelectTheme,
  },
});

export default theme;
