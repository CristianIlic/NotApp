import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: 'backgroundText',
  },
})

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: '8px',
    },
  }),
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })