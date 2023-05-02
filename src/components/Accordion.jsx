import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: '#0EA293', // change the backgroundColor of the containerrrrs
    borderRadius: '8px',
    margin: '8px'
  },
  button: {
    bg: '#27E1C1',
    borderRadius: '8px',
  },
  panel:{
    bg: '#19092e',
    borderRadius: '5px',
  }
})
export const accordionTheme = defineMultiStyleConfig({ baseStyle })