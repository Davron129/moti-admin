import {useState,  useRef, MutableRefObject, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../utils/network/api";
import { ImSpinner9 } from "react-icons/im";

import { API } from "../../utils/constants";
import DropFileInput from '../../components/DropFileInput/index';
import Styles from './../CategoryAdd/CategoryStyles.module.css';

const CategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const isMounted = useRef<boolean>(true);
    const [ name, setName ] = useState<string>("");
    const [ price, setPrice ] = useState<number>(0);
    const [ imageHash, setImageHash ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ description, setDescription ] = useState<string>("");
    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [ imageFile, setImageFile ] = useState<File | undefined>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const imageFormData: FormData = new FormData();
        imageFile && imageFormData.append("file", imageFile);

        if(imageFile) {
            setIsLoading(true);

            new Api()
                .saveFile(imageFormData)
                .then(({data}) => { 
                    editFood(data.data.hashId)
                })
        } else {
            editFood(imageHash);
        }
    }

    const editFood = (hash: string) => {
        new Api()
            .editFood(params.id, hash, name, description, price)
            .then(() => { setIsLoading(false); })
            .then(() => { navigate("/categories") })
    }

    useEffect(() => {
        new Api()
            .getFood(params.id)
            .then(({data}) => {
                if(isMounted.current) {
                    setName(data.data.name);
                    setPrice(data.data.sum);
                    setImageHash(data.data.image.hashId);
                    setDescription(data.data.description);
                    imageRef.current.src = `${API}/api/auth/file/preview/${data.data.image.hashId}`
                }    
            })
        return () => {
            isMounted.current = false;
        }
    }, [params.id])

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
                                !isLoading ? "Изменять" : <span className={Styles.loader}><ImSpinner9 /></span>
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
                            <span>{price} so'm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryEdit