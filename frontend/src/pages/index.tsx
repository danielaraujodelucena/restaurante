import { useContext, FormEvent, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/home.module.scss'

import logoRestaurante from '../../public/logo-restaurante.png'
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { AuthContext } from "../contexts/AuthContext"
import Link from "next/link"

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === '') {
      alert("Preencha os dados")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }
    
    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Seja bem-vindo</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoRestaurante} alt="Logo do restaurante" width={150} />
      
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              placeholder="Email" 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            
            <Input 
              placeholder="Senha" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            
            <Button 
              type="submit" 
              loading={loading}> 
                Acessar 
            </Button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

        </div>
      </div>
    </>
  )
}
