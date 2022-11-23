import { useState, FormEvent, ChangeEvent } from "react"
import Head from "next/head"
import { toast } from "react-toastify"
import { FiUpload } from "react-icons/fi"
import Image from "next/image"

import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"

type ItemProps = {
    id: string;
    name: string;
}
interface CategoryProps {
    categoryList: ItemProps[];
}

/*
    Se estivéssemos utilizando apenas JavaScript 
    neste projeto, poderíamos deixar a prop apenas
    como categoryList (sem uma tipagem). Entretanto,
    como estamos utilizando TypeScript, é necessário
    criar uma tipagem, a qual foi declarada em
    ItemProps e CategoryProps. 
*/

export default function Product({ categoryList }: CategoryProps) {
    /*
        Ao executar o console.log(categoryList) aqui 
        dentro de Product, o resultado é exibido na 
        aba de desenvolvedor do navegador, ou seja, 
        no LADO DO CLIENTE.
    */

    const [name, setName] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

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

    function handleChangeCategory(event) {
        setCategorySelected(event.target.value);
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

        toast.success('Produto cadastrado com sucesso');
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

                <select value={categorySelected} onChange={handleChangeCategory}>
                    {categories.map((item, index) => {
                        return(
                            <option key={item.id} value={index}>
                                {item.name}
                            </option>
                        )
                    })}
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
                    onChange={ (e) => setPreco(e.target.value) }
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
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/category');

    /*
        Quando executa o console.log(response.data) aqui, 
        o resultado é mostrado no terminal, ou seja, no
        LADO DO SERVIDOR.

        O response.data é passado como prop para Product
        através do categoryList. Ao eecutar o 
        console.log(categoryList) dentro de Product, o
        resultado é exibido na aba de desenvolvedor do
        navegador, ou seja, no LADO DO CLIENTE.
    */

    return {
        props: {
            categoryList: response.data
        }
    }
})
