import { useState, FormEvent, useEffect, ChangeEvent } from "react"
import Head from "next/head"
import { toast } from "react-toastify"
import Router from 'next/router'
import { FiTrash2 } from 'react-icons/fi'
import Modal from "react-modal"


import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { ListItems } from "../../components/ListItems"
import { ModalSendOrder } from "../../components/ModalSendOrder"

// os dados e seus tipos são consultados na rota do backend
type CategoriesProps = {
    id: string;
    name: string;
}

type CategorySelectedProps = {
    id: string;
    name: string;
}

type ItemsCategoryProps = {
    id: string;
    name: string;
}

type ItemSelectedProps = {
    id: string;
    name: string;
}

export type ItemList = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    name: string;
}

export default function Order() {
    const { table, order_id } = Router.query;

    /* 
        teremos que armazenar a lista de categorias 
        para serem exibidas no select
    */

    const [categories, setCategories] = useState<CategoriesProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategorySelectedProps>();
    
    const [itemsCategory, setItemsCategory] = useState<ItemsCategoryProps[] | []>([])
    const [itemSelected, setItemSelected] = useState<ItemSelectedProps>();
    
    const [amount, setAmount] = useState('1');

    const [itemList, setItemList] = useState<ItemList[]>([])

    const [modalVisible, setModalVisible] = useState(false);


    /*
        useEffect é executado quando a tela for carregada
    */

    useEffect(() => {
        loadingCategories();
    }, [])

    async function loadingCategories() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/category');

        setCategories(response.data);
    }


    async function handleCloseOrder() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete('/order', { 
                params: {
                    order_id: order_id 
                }
            });

            Router.push('/open-table');
        } catch (error) {
            console.log(error)
        }
    }

    function handleCategorySelected(event: ChangeEvent<HTMLSelectElement>) {
        const value = (event.target.value).split('#');
        const id = value[0];
        const name = value[1];

        const category: CategorySelectedProps = {
            id: id,
            name: name
        }

        setCategorySelected(category);
        handleListItemsCategorySelected(category.id);
    }

    async function handleListItemsCategorySelected(id:string){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/category/product', { 
            params: {
                category_id: id 
            }
        });

        setItemsCategory(response.data);
    }

    async function handleItemSelected(event: ChangeEvent<HTMLSelectElement>) {
        const value = (event.target.value).split('#');
        const id = value[0];
        const name = value[1];

        const itemSelected: ItemSelectedProps = {
            id: id,
            name: name
        }

        setItemSelected(itemSelected);
    }

    async function handleAddItem() {
        const apiClient = setupAPIClient();
        const response = await apiClient.post('/order/add', {
            order_id: order_id,
            product_id: itemSelected.id,
            amount: parseInt(amount)
        });

        const item = {
            id: response.data.id,
            amount: parseInt(amount),
            order_id: order_id,
            product_id: itemSelected.id,
            name: itemSelected.name
        }

        setItemList(oldArray => [...oldArray, item]);
    }

    async function handleDeleteItem(item_id:string) {
        //alert(item_id)
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete('/order/remove', { 
                params: {
                    item_id: item_id 
                }
            });

            const newList = itemList.filter(itemList => {
                return (itemList.id !== item_id)
            })
            
            setItemList(newList);
        } catch (error) {
            console.log(error)
        }
    }

    function handleCloseModal() {
        setModalVisible(false);
      }

    function openModal() {
        setModalVisible(true);
    }

    async function handleSendOrder() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put('/order/send', { 
                order_id: order_id 
            });

            toast.success("Pedido enviado com sucesso");

            Router.push('/dashboard');
        } catch (error) {
            console.log(error)
        }
    }

    Modal.setAppElement('#__next');

    return (
        <>
        <Head>
            <title>Adicionar item - Chef Caseiro</title>
        </Head>

        <Header />
        
        <div className={styles.container}>
            <h1>
                Mesa {table} 
                {
                    itemList.length === 0 && (
                        <button className={styles.btnDelete} onClick={handleCloseOrder}>
                            <FiTrash2 color='#FF564F' size={25} />
                        </button>
                    )
                }
            </h1>

            <div className={styles.form}>
                {categories.length !== 0 && (
                    <select onChange={handleCategorySelected}>   
                        <option>Selecione a categoria</option>
                        {categories.map((item, index) => {
                            return(
                                <option key={index} value={item.id + '#' + item.name}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                )}

                {itemsCategory.length !== 0 && (
                    <select onChange={handleItemSelected}>   
                        {itemsCategory.map((item, index) => {
                            return(
                                <option key={index} value={item.id + '#' + item.name}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                )}
                
                <input 
                    type="text"
                    placeholder="Quantidade"
                    className={styles.input}
                    value={amount}
                    onChange={ (e) => setAmount(e.target.value) }
                />

                <div className={styles.btns}>
                    <button 
                        className={styles.buttonAdd} 
                        type="submit"
                        onClick={handleAddItem}
                    >
                        +
                    </button>
                    
                    <button 
                        className={styles.buttonAvancar} 
                        type="submit"
                        style={{opacity: itemList.length === 0 ? 0.3 : 1}}
                        disabled={itemList.length === 0}
                        onClick={openModal}
                    >
                        Avançar
                    </button>
                </div>

            </div>

            {
                itemList.length > 0 && (
                    <ListItems 
                        itemList={itemList} 
                        handleDeleteItem={handleDeleteItem} 
                    />
                ) 
            }

            {modalVisible && (
                <ModalSendOrder 
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    order_id={order_id}
                    table={table}
                    sendOrder={handleSendOrder}
                />
            )}
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})
