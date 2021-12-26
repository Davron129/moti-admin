import {useState,  useRef, MutableRefObject, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../utils/network/api";

import DropFileInput from '../../components/DropFileInput/index';
import Styles from './../CategoryAdd/CategoryStyles.module.css';

const CategoryEdit = () => {
    const isMounted = useRef<boolean>(true);
    const params = useParams();
    const navigate = useNavigate();
    const imageRef = useRef() as MutableRefObject<HTMLImageElement>;
    const [ name, setName ] = useState<string>("");
    const [ price, setPrice ] = useState<number>(0);
    const [ imageHash, setImageHash ] = useState<string>("");
    const [ imageFile, setImageFile ] = useState<File | undefined>();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const imageFormData: FormData = new FormData();
        imageFile && imageFormData.append("file", imageFile);
        console.log("ishladi")

        new Api()
            .saveFile(imageFormData)
            .then(({data}) => { 
                editFood(data.data.hashId)
                })
    }

    const editFood = (hash: string) => {
        new Api()
            .editFood(params.id, hash, name, price)
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
                    imageRef.current.src = `http://161.35.139.54:8082/api/auth/file/preview/${data.data.image.hashId}`
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
                            <span className={Styles.form__label}>Food Name</span>
                            <input
                                type="text"
                                className={Styles.form__input}
                                placeholder={"Enter Food Name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
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