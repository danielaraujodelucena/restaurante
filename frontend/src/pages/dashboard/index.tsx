import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"

import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { FiRefreshCcw } from "react-icons/fi"

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Header />
      
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>

          <button>
            <FiRefreshCcw size={25} color="#34C759" />
          </button>
        </div>

        <article className={styles.listOrders}>

          <section className={styles.orderItem}>
            <button>
              <div className={styles.tag}></div>
              <span>Mesa 20</span>
            </button>
          </section>

          <section className={styles.orderItem}>
            <button>
              <div className={styles.tag}></div>
              <span>Mesa 20</span>
            </button>
          </section>

        </article>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
