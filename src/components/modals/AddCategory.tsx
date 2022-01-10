import axios from "axios";
import { FormEvent, useState, useRef, MutableRefObject } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { succesMsg, errorMsg } from "../../utils/functions/toast";
import { BiCloudUpload } from "react-icons/bi";
import { ImSpinner9 } from 'react-icons/im';
import Api from "../../utils/network/api";

import Styles from './ModalStyles.module.css';

interface AddProps {
    closeModal: Function;
    handleDataChange: Function
}

const AddCategory = ({ closeModal, handleDataChange }: AddProps) => {
    const [ name, setName ] = useState<string>("");
    const [ progress ,setProgress ] = useState<number>(0);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        if((e.target as Element).getAttribute("data-modal")) {
            closeModal(false);
        }
    }

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setIsLoading(true);

        const imageFormData: FormData = new FormData();
        const file = inputRef.current.files && inputRef.current.files[0];
        
        if(file) {
            imageFormData.append("file", file);

            axios.post('/admin/file/save', imageFormData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('moti_token')}`,
                    'content-type': 'multipart/form-data'
                },
                onUploadProgress: (data) => { // for progress bar
                    setProgress(Math.round((100*data.loaded)/ data.total));
                }
            })
            .then(({data}) => {
                new Api()
                    .addCategory(data.data.hashId, name)
                    .then(() => {
                        closeModal(false); // close after success
                        handleDataChange((prev: boolean) => !prev) // render after data change
                        succesMsg("Category saved succesfully"); // toast about success
                        setIsLoading(false);
                    })
            })
        } else {
            errorMsg("File not uploaded")
        }
    }

    return (
        <div className={Styles.sideModal} onClick={(e) => handleCloseModal(e)} data-modal={true} >
            <div className={Styles.sideModal__body}>
                <div className={Styles.modal__title}>Добавить категорию</div>
                <span className={Styles.modal__close} onClick={() => closeModal(false)}>
                    <AiOutlineCloseCircle />
                </span>
                
                <div className={Styles.modal__content}>
                    <form onSubmit={(e) => handleSubmit(e)} className={Styles.modal__form}>
                        <div style={{ marginBottom: "10px"}}>
                            <label style={{ margin: "0 auto", display: "grid", placeItems: "center"}}>
                                <div className={Styles.img__wrapper}>
                                    <img src="" alt="" ref={imageRef} />
                                    <div className={Styles.icon__wrapper}>
                                        <BiCloudUpload color="#54A75C" />
                                    </div>
                                </div>
                                <input 
                                    type="file"
                                    accept="image/*"
                                    ref={inputRef}
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        if(e.target.files) {
                                            imageRef.current.src = URL.createObjectURL(e.target.files[0])
                                        }
                                    }}
                                />
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
                            placeholder="Название категории"    
                            className={Styles.modal__input}
                            required
                            autoFocus
                        />
                        <button 
                            className={Styles.modal__btn}
                            disabled={isLoading}    
                        >
                            {
                                !isLoading ? "Сохранять" : (<span>
                                    <ImSpinner9 className={Styles.loader} />
                                </span>) 
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategory