import { useState, FormEvent, ChangeEvent } from "react"
import Head from "next/head"
import { toast } from "react-toastify"
import Router from 'next/router';

import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"


export default function OpenTable() {
    const [number, setNumber] = useState('');
    
    async function openTable(event: FormEvent) {
        event.preventDefault();
        
        try {
            if(number === ''){
                toast.error('Preencha todos os campos');
                return;
            }

            const apiClient = setupAPIClient();
            const response = await apiClient.post('/order', { 
                table: parseInt(number) 
            });

            //pega os dados da resposta = response.data
            //console.log('Daniel | response = ', response.data)
                
            toast.success('Mesa aberta com sucesso');
            
            Router.push({
                pathname: '/order',
                query: { table: number, order_id: response.data.id }
            });

            setNumber('');
        } catch (error) {
            console.log(error)
            toast.error('Erro ao abrir mesa');
        }
    }

    return (
        <>
        <Head>
            <title>Abrir mesa - Chef Caseiro</title>
        </Head>

        <Header />
        
        <div className={styles.container}>
            <h1>Abrir mesa</h1>

            <form className={styles.form} onSubmit={openTable}>
                <input 
                    type="text"
                    placeholder="Número da mesa"
                    className={styles.input}
                    value={number}
                    onChange={ (e) => setNumber(e.target.value) }
                />

                <button className={styles.buttonAdd} type="submit">
                    Abrir mesa
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
