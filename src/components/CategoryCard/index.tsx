import { RefObject } from 'react';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import Styles from '../../views/CategoryAdd/CategoryStyles.module.css';

type CategoryCardProps = {
    name: string;
    price: number;
    imageRef?: RefObject<HTMLImageElement>;
    imageSrc?: string;
    deleteFunc?: Function;
    id?: string
}

const CategoryCard = ({ name, price, imageRef, imageSrc, deleteFunc, id }: CategoryCardProps) => {
    return (
        <div className={Styles.category__card}>
            <div className={Styles.category__img}>
                <img src={imageSrc} ref={imageRef} alt="" />
            </div>
            <div className={Styles.card__body}>
                <div className={Styles.category__name}>
                    <span>{name}</span>
                </div>
                <div className={Styles.category__price}>
                    {
                        imageSrc && (
                            <div className={Styles.category__actions}>
                                <Link to={`/food/edit/${id}`} className={Styles.icon__wrapper}><GrEdit /></Link>
                                <div 
                                    className={Styles.icon__wrapper}
                                    onClick={() => deleteFunc && deleteFunc()}    
                                ><RiDeleteBinFill /></div>
                            </div>
                        )
                    }
                    <span>{price} so'm</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard