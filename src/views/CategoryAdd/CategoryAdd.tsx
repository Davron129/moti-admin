import Api from "../../utils/network/api";
import { useNavigate } from "react-router-dom";
import { useState,  useRef, MutableRefObject, FormEvent } from "react";
import { ToastContainer } from "react-toastify";
import { ImSpinner9 } from 'react-icons/im';

import { errorMsg } from "../../utils/functions/toast";
import DropFileInput from '../../components/DropFileInput/index';

import Styles from './CategoryStyles.module.css';

const CategoryAdd = () => {
    const navigate = useNavigate();
    const [ name, setName ] = useState<string>("");
    const [ price, setPrice ] = useState<number>(0);
    const [ description, setDescription ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [ imageFile, setImageFile ] = useState<File | undefined>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const imageFormData: FormData = new FormData();
        imageFile && imageFormData.append("file", imageFile);

        if(price !== 0 && name !== "" && imageFile) {
            setIsLoading(true);

            new Api()
                .saveFile(imageFormData)
                .then(({data}) => {
                    new Api()
                        .addFood(localStorage.getItem("cat_id"), data.data.hashId, name, description, price)
                        .then(() => { setIsLoading(false) })
                        .then(() => { navigate("/categories") })
                })
        } else {
            price === 0 && errorMsg("Цена категории не должна быть равна 0");
            !imageFile && errorMsg("Изображение категории не было загружено");
            name === "" && errorMsg("Укажите название категории.");
        }
    }

    return (
        <div className={Styles.category__add}>
            <div className={Styles.category__form}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={Styles.form__group}>
                        <label>
                            <span className={Styles.form__label}>Название еды*</span>
                            <input
                                type="text"
                                className={Styles.form__input}
                                placeholder={"Введите название еды"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        </label>
                    </div>
                    <div className={Styles.form__group}>
                        <label>
                            <span className={Styles.form__label}>Описание еды</span>
                            <input
                                type="text"
                                className={Styles.form__input}
                                placeholder={"Введите описание еды"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                autoFocus
                            />
                        </label>
                    </div>
                    <div className={Styles.form__group}>
                        <label>
                            <span className={Styles.form__label}>Цена еды*</span>
                            <input
                                type="number"
                                className={Styles.form__input}
                                min={0}
                                step={10}
                                value={price}
                                onChange={(e) => setPrice(Number(e.currentTarget.value))}
                            />
                        </label>
                    </div>
                    <div className={Styles.form__group}>
                        <DropFileInput 
                            imageRef={imageRef} 
                            setFile={setImageFile}
                        />
                    </div>
                    <div className={Styles.form__group}>
                        <button disabled={isLoading}>
                            {
                                !isLoading ? "Сохранять" : <span className={Styles.loader}><ImSpinner9 /></span>
                            }
                        </button>
                    </div>
                </form>
            </div>
            <div className={Styles.category__view}>
                <div className={Styles.category__card}>
                    <div className={Styles.category__img}>
                        <img src="" ref={imageRef} alt="" />
                    </div>
                    <div className={Styles.card__body}>
                        <div className={Styles.category__name}>
                            <span>{name}</span>
                        </div>
                        <div className={Styles.category__description}>
                            <span>{description}</span>
                        </div>
                        <div className={Styles.category__price}>
                            <span>{price} cум</span>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
        
    );
}

export default CategoryAdd