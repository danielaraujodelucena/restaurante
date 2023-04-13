import Link from 'next/link'
import Image from "next/image"
import { FiLogOut } from 'react-icons/fi'
import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import logo from '../../../public/logo.png'
import styles from './styles.module.scss'

export function Header() {

    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image src={logo} alt="Logomarca restaurante" width={80} />
                </Link> 

                <nav className={styles.menuNav}>
                    <Link href='/dashboard'>Dashboard</Link>
                    <Link href='/open-table'>Pedido</Link>
                    <Link href='/category'>Categoria</Link>
                    <Link href='/product'>Produto</Link>
                    <button onClick={signOut}>
                        <FiLogOut color='#003459' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}