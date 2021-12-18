import { FormEvent, useState } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Styles from './ModalStyles.module.css';

interface AddProps {
    closeModal: Function;
    addFunc: Function;
}

const AddCategory = ({ closeModal, addFunc }: AddProps) => {
    const [ name, setName ] = useState<string>("");

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        if((e.target as Element).getAttribute("data-modal")) {
            closeModal(false);
        }
    }

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        addFunc(name);
    }

    return (
        <div className={Styles.modal} onClick={(e) => handleCloseModal(e)} data-modal={true} >
            <div className={Styles.modal__body}>
                <div className={Styles.modal__title}>Add Category</div>
                <span className={Styles.modal__close} onClick={() => closeModal(false)}>
                    <AiOutlineCloseCircle />
                </span>
                
                <div className={Styles.modal__content}>
                    <form onSubmit={(e) => handleSubmit(e)} className={Styles.modal__form}>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category Name"    
                            className={Styles.modal__input}
                        />
                        <button className={Styles.modal__btn}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategory