import { AiOutlineCloseCircle } from 'react-icons/ai';

import Styles from './ModalStyles.module.css';

type AddProps =  {
    closeModal: Function;
    acceptFunc: Function;
    modalText: string;
}

const ConfirmModal = ({ closeModal, acceptFunc, modalText }: AddProps) => {
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        if((e.target as Element).getAttribute("data-modal")) {
            closeModal(false);
        }
    }

    return (
        <div className={Styles.modal} onClick={(e) => handleCloseModal(e)} data-modal={true} >
            <div className={Styles.modal__body}>
                <span className={Styles.modal__close} onClick={() => closeModal(false)}><AiOutlineCloseCircle /></span>
                <div className={Styles.modal__content}>
                    <span className={Styles.modal__text}>{ modalText }</span>
                </div>
                <div className={Styles.modal__actions}>
                    <button 
                        className={`${Styles.modal__btn} ${Styles.modal__accept}`}
                        onClick={() => acceptFunc() }    
                        autoFocus
                    >
                        Дa
                    </button>
                    <button   
                        className={`${Styles.modal__btn} ${Styles.modal__decline}`}
                        onClick={() => closeModal(false)}    
                    >Нет</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal