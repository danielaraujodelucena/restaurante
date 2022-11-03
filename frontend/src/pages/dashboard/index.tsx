import Head from "next/head"
import Image from "next/image"
import styles from '../../../styles/home.module.scss'

import logoRestaurante from '../../../public/logo-restaurante.png'
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"

import Link from "next/link"

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={styles.containerCenter}>
        <h1>Dashboad</h1>
      </div>
    </>
  )
}
