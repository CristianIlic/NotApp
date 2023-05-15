import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  border: "500px dashed", // change the appearance of the border
  bg: "red",
  color: "blue",
});

export const buttonTheme = defineStyleConfig({
  variants: { outline },
});
