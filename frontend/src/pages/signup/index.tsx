import Head from "next/head"
import Image from "next/image"
import styles from '../../../styles/home.module.scss'

import logoRestaurante from '../../../public/logo-restaurante.png'
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"

import Link from "next/link"

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça o seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoRestaurante} alt="Logo do restaurante" width={150} />
      
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          
          <form>
            <Input placeholder="Nome" type="text" />
            <Input placeholder="Email" type="text" />
            <Input placeholder="Senha" type="password" />
            <Button type="submit" loading={false}> Cadastrar </Button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>

        </div>
      </div>
    </>
  )
}
