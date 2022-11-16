import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"

import { Header } from "../../components/Header"
import styles from './styles.module.scss'

export default function Category() {
  return (
    <>
      <Head>
        <title>Nova categoria - Chef Caseiro</title>
      </Head>

      <Header />
      
      <div className={styles.container}>
        <h1>Cadastrar categoria</h1>

        <form className={styles.form}>
            <input 
                type="text"
                placeholder="Nome da categoria"
                className={styles.input}
            />

            <button className={styles.buttonAdd} type="submit">
                Cadastrar
            </button>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
