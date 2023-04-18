import React, { Suspense } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import theme from './styles/theme'

import { FirebaseAppProvider } from 'reactfire'
import firebaseConfig from './firebase-config'

import '@fontsource/Raleway/700.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ChakraProvider theme={theme}>
        <Suspense fallback="Conectando la app...">
          <App />
        </Suspense>
      </ChakraProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
)
