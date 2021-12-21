import { RefObject } from 'react';
import Styles from '../../views/CategoryAdd/CategoryStyles.module.css';

type CategoryCardProps = {
    name: string;
    price: number;
    imageRef?: RefObject<HTMLImageElement>;
    imageSrc?: string;
}

const CategoryCard = ({ name, price, imageRef, imageSrc }: CategoryCardProps) => {
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
                    <span>{price} so'm</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard