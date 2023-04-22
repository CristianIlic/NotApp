import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: '#2F0F5D', // change the backgroundColor of the container
  }
})

export const accordionTheme = defineMultiStyleConfig({ baseStyle })