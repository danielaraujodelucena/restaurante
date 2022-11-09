import { useState, FormEvent, useContext } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from '../../../styles/home.module.scss'

import logoRestaurante from '../../../public/logo-restaurante.png'
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"

import { AuthContext } from "../../contexts/AuthContext"

import Link from "next/link"
import { toast } from 'react-toastify';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event:FormEvent) {
    event.preventDefault();

    if(name === ''|| email === '' || password === '') {
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça o seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoRestaurante} alt="Logo do restaurante" width={200} />
      
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          
          <form onSubmit={handleSignUp}>
            <Input 
              placeholder="Nome" 
              type="text"
              value={name}
              onChange={ (e) => setName(e.target.value) } 
            />

            <Input 
              placeholder="Email" 
              type="text"
              value={email}
              onChange={ (e) => setEmail(e.target.value) } 
            />

            <Input 
              placeholder="Senha" 
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value) } 
            />

            <Button type="submit" loading={loading}> Cadastrar </Button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça o login
          </Link>

        </div>
      </div>
    </>
  )
}
