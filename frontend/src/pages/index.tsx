import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/home.module.scss'

import logoRestaurante from '../../public/logo-restaurante.png'
import { Input } from "../components/ui/Input"

export default function Home() {
  return (
    <>
      <Head>
        <title>Seja bem-vindo</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoRestaurante} alt="Logo do restaurante" width={150} />
      
        <div className={styles.login}>
          <form>
            <Input placeholder="Email" type="text" />
            <Input placeholder="Senha" type="password" />
          </form>
        </div>
      </div>
    </>
  )
}
