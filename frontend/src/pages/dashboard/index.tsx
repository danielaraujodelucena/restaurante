import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"

import { Header } from "../../components/Header"
import styles from '../../../styles/home.module.scss'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Header />
      
      <div className={styles.containerCenter}>
        <h1>Dashboad</h1>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
