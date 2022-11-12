import '../../styles/globals.scss'
import { AppProps } from "next/app"
import { AuthProvider } from '../contexts/AuthContext'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
  Componente utilizado para inicializar cada página.
*/

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}

export default MyApp
