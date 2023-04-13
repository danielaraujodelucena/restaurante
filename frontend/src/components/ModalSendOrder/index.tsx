import Modal from "react-modal"
import { FiX } from "react-icons/fi"

import styles from "./styles.module.scss"

interface ModalFinishOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order_id: string;
    table: string;
    sendOrder: () => void;
}

export function ModalSendOrder({ 
    isOpen, 
    onRequestClose, 
    order_id, 
    table,
    sendOrder }: ModalFinishOrderProps) {
    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#EEC77E' 
        }
    }



    return(
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#FF564F" />
            </button>

            <div className={styles.container}>
                <h2>Finalizando</h2>
                
                <span className={styles.table}>
                    Mesa: <strong>{table}</strong> 
                </span>
                {/* {onClick={() => handleFinishOrder(order_id)}} */}
                <button className={styles.buttonOrder} onClick={sendOrder}>
                    Enviando pedido
                </button>
            </div>
        </Modal>
    )
}