import { FormEvent, MutableRefObject, useState, useRef } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Styles from './ModalStyles.module.css';

type AddProps =  {
    editFunc: Function;
    closeModal: Function;
    catName: string
}

const EditCategory = ({ editFunc, closeModal, catName }: AddProps) => {
    const fileInput = useRef() as MutableRefObject<HTMLInputElement>;
    const [ name, setName ] = useState<string>(catName);

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        if((e.target as Element).getAttribute("data-modal")) {
            closeModal(false);
        }
    }

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        editFunc(name);
    }

    return (
        <div className={Styles.modal} onClick={(e) => handleCloseModal(e)} data-modal={true} >
            <div className={Styles.modal__body}>
                <div className={Styles.modal__title}>Edit Category</div>
                <span className={Styles.modal__close} onClick={() => closeModal(false)}><AiOutlineCloseCircle /></span>
                <div className={Styles.modal__content}>
                    <form onSubmit={(e) => handleSubmit(e)} className={Styles.modal__form}>
                        <div>
                            <input 
                                type="file"
                                ref={fileInput}
                            />
                        </div>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category Name"    
                            className={Styles.modal__input}
                            autoFocus
                        />
                        <button className={Styles.modal__btn}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCategory