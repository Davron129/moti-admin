import {useState,  useRef, MutableRefObject, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import DropFileInput from '../../components/DropFileInput/index';
import Api from "../../utils/network/api";

import Styles from './CategoryStyles.module.css';

const CategoryAdd = () => {
    const navigate = useNavigate();
    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [ name, setName ] = useState<string>("");
    const [ price, setPrice ] = useState<number>(0);
    const [ imageFile, setImageFile ] = useState<File | undefined>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const imageFormData: FormData = new FormData();
        imageFile && imageFormData.append("file", imageFile);

        new Api()
            .saveFile(imageFormData)
            .then(({data}) => {
                new Api()
                    .addFood(localStorage.getItem("cat_id"), data.data.hashId, name, price)
                    .then(() => { navigate("/categories") })
            })
    }

    return (
        <div className={Styles.category__add}>
            <div className={Styles.category__form}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={Styles.form__group}>
                        <label>
                            <span className={Styles.form__label}>Food Name</span>
                            <input
                                type="text"
                                className={Styles.form__input}
                                placeholder={"Enter Food Name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className={Styles.form__group}>
                        <label>
                            <span className={Styles.form__label}>Food Price</span>
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
                        <button>Save</button>
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
                        <div className={Styles.category__price}>
                            <span>{price} so'm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryAdd