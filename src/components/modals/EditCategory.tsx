import { FormEvent, MutableRefObject, useState, useRef } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';

import Styles from './ModalStyles.module.css';

type AddProps =  {
    catName: string;
    progress: number;
    editFunc: Function;
    closeModal: Function;
    fileRef: MutableRefObject<HTMLInputElement>;
}

const EditCategory = ({ editFunc, closeModal, catName, fileRef, progress }: AddProps) => {
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
                    <div style={{ marginBottom: "10px"}}>
                            <label style={{ margin: "0 auto", display: "grid", placeItems: "center"}}>
                                <div className={Styles.img__wrapper}>
                                    <BiCloudUpload color="#54A75C" />
                                </div>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    ref={fileRef}
                                    style={{ display: "none" }}
                                />
                                <span>
                                    {
                                        fileRef?.current?.files && fileRef.current.files[0]?.name
                                    }
                                </span>
                            </label>
                        </div>
                        {
                            progress !== 0 && progress !== 100 && (
                                <div>
                                    <progress
                                        max={100}
                                        value={progress}
                                        className={Styles.modal__progress}
                                    ></progress>
                                </div>
                            )
                        }
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category Name"    
                            className={Styles.modal__input}
                            autoFocus
                        />
                        <button 
                            className={Styles.modal__btn}
                            disabled={progress > 0 && progress < 100}    
                        >Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCategory