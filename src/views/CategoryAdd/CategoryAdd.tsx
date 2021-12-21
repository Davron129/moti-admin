import {useState, ChangeEvent, FormEvent, useRef} from "react";
import Api from '../../utils/network/api';
import Styles from './CategoryStyles.module.css';
import DropFileInput from '../../components/DropFileInput/index';

const CategoryAdd = () => {
    const imageRef = useRef<HTMLImageElement | null>(null)
    const [ name, setName ] = useState<string>("");
    const [ price, setPrice ] = useState<number>(0);

    return (
        <div className={Styles.category__add}>
            <div className={Styles.category__form}>
                <form>
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
                        <DropFileInput imageRef={imageRef} />
                    </div>
                </form>
            </div>
            <div className={Styles.category__view}></div>
        </div>
    );
}

export default CategoryAdd