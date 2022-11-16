import { useState, FormEvent, ChangeEvent } from "react"
import Head from "next/head"
import { toast } from "react-toastify"
import { FiUpload } from "react-icons/fi"
import Image from "next/image"

import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"

export default function Product() {
    const [name, setName] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) {
            return;
        }

        const image = event.target.files[0];

        if(!image) {
            return;
        }

        if(image.type === 'image/png' || image.type === 'image/jpeg') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image));
        }
    }
    
    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        
        if(name === ''){
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/product', {
            name: name
        });

        toast.success('Categoria cadastrada com sucesso');
        setName('');
    }

    return (
        <>
        <Head>
            <title>Novo produto - Chef Caseiro</title>
        </Head>

        <Header />
        
        <div className={styles.container}>
            <h1>Cadastrar produto</h1>

            <form className={styles.form} onSubmit={handleRegister}>
                <label className={styles.labelAvatar}>
                    <span>
                        <FiUpload size={30} color="#003459" />
                    </span>

                    <input 
                        type="file" 
                        accept="image/png, image/jpeg"
                        onChange={handleFile} 
                    />

                    {avatarUrl && (
                        <Image
                            className={styles.preview}
                            src={avatarUrl}
                            alt="Foto do produto"
                            width={250}
                            height={250}
                        />
                    )}
                </label>

                <select>
                    <option>
                        Pizzas
                    </option>

                    <option>
                        Sorvetes
                    </option>
                </select>

                <input 
                    type="text"
                    placeholder="Nome"
                    className={styles.input}
                    value={name}
                    onChange={ (e) => setName(e.target.value) }
                />

                <input 
                    type="text"
                    placeholder="Preço"
                    className={styles.input}
                    value={name}
                    onChange={ (e) => setName(e.target.value) }
                />

                <textarea 
                    className={styles.input} 
                    placeholder="Descreva o produto..." 
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
