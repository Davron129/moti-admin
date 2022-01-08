import { FormEvent, MutableRefObject, useState, useRef } from "react";
import axios from 'axios';
import Api from "../../utils/network/api";
import { succesMsg } from "../../utils/functions/toast";

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';
import { ImSpinner9 } from 'react-icons/im';

import Styles from './ModalStyles.module.css';

type AddProps =  {
    closeModal: Function;
    handleDataChange: Function;
    category: Categoryinterface;
}

interface Categoryinterface {
    foods: []
    id: string;
    name: string;
    image: {
        hashId: string
    }
};

const EditCategory = ({ closeModal, category, handleDataChange }: AddProps) => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [ name, setName ] = useState<string>(category.name);
    const [ progress, setProgress ] = useState<number>(0);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

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
                    .editCategory(category.id, data.data.hashId, name)
                    .then(() => {
                        closeModal(false); // close after success
                        handleDataChange((prev: boolean) => !prev);
                        setIsLoading(false);
                        succesMsg("Category saved succesfully"); // toast about success
                    })
            })
        } else {
            new Api()
                .editCategory(category.id, category.image.hashId, name)
                .then(() => {
                    closeModal(false);
                    handleDataChange((prev: boolean) => !prev);
                    succesMsg("Category editted succesfully"); // toast about success
                })
        }
    }

    return (
        <div className={Styles.sideModal} onClick={(e) => handleCloseModal(e)} data-modal={true} >
            <div className={Styles.sideModal__body}>
                <div className={Styles.modal__title}>Edit Category</div>
                <span className={Styles.modal__close} onClick={() => closeModal(false)}><AiOutlineCloseCircle /></span>
                <div className={Styles.modal__content}>
                    <form onSubmit={(e) => handleSubmit(e)} className={Styles.modal__form}>
                    <div style={{ marginBottom: "10px"}}>
                            <label style={{ margin: "0 auto", display: "grid", placeItems: "center"}}>
                                <div className={Styles.img__wrapper}>
                                    <img src={`http://104.131.32.51:8081/api/auth/file/preview/${category.image.hashId}`} alt="" ref={imageRef} />
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
                                <span>
                                    {
                                        inputRef?.current?.files && inputRef.current.files[0]?.name
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
                            disabled={isLoading}    
                        >
                            {
                                !isLoading ? "Save" : (<span>
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

export default EditCategory