import {useState,  useRef, MutableRefObject, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../utils/network/api";

import DropFileInput from '../../components/DropFileInput/index';
import Styles from './../CategoryAdd/CategoryStyles.module.css';

const CategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [ name, setName ] = useState<string>("");
    const [ price, setPrice ] = useState<number>(0);
    const [ imageHash, setImageHash ] = useState<string>("");
    const [ imageFile, setImageFile ] = useState<File | undefined>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(imageHash === "") {
            const imageFormData: FormData = new FormData();
            imageFile && imageFormData.append("file", imageFile);

            new Api()
                .saveFile(imageFormData)
                .then(({data}) => { setImageHash(data.data.hashId) })
                .then(() => { editFood() })
        } else {
            editFood();
        }
    }

    const editFood = () => {
        new Api()
            .editFood(params.id, imageHash, name, price)
            .then(() => { navigate("/dashboard") })
    }

    useEffect(() => {
        new Api()
            .getFood(params.id)
            .then(({data}) => {
                setName(data.data.name);
                setPrice(data.data.sum);
                setImageHash(data.data.image.hashId);
                imageRef.current.src = `https://cafe-service-f.herokuapp.com/api/admin/file/download/${data.data.image.hashId}`
            })
    }, [params.id])

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

export default CategoryEdit