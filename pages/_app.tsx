import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../features/store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (<ChakraProvider>
    <Provider store={store}>
    <ToastContainer position='top-right'/>
    <Component {...pageProps} />
    </Provider>
  </ChakraProvider>)
}

export default MyApp
