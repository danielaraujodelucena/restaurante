import { FiTrash2 } from 'react-icons/fi'

export function ListItems ({itemList, handleDeleteItem}) {
    async function deleteItem(id:string) {
        handleDeleteItem(id)
    }

    return (
        <>
            <h2>Itens do pedido</h2>
            <ul>
                {itemList.map((item, index) => {
                    return(
                        <li key={index}>
                            {item.name}
                            <button onClick={() => deleteItem(item.id)}> 
                                <FiTrash2 color='#FF564F' size={15} />
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}