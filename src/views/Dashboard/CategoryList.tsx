import Styles from './Dashboard.module.css';
import SwiperCore, { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([FreeMode]);

type CategoryProps = {
    categories: Category[];
    isOverlayOpen: boolean;
    clickAction: Function
}

type Category = {
    id: string;
    name: string;
    foods: []
}

const CategoryList = ({categories, isOverlayOpen, clickAction} : CategoryProps) => {
    return (
        <div className={Styles.categories}>
            <div className={`${Styles.category__inner} ${isOverlayOpen && Styles.category__active}`}>
                <Swiper slidesPerView={'auto'} freeMode={true} >
                    {
                        categories.map(category => (
                            <SwiperSlide key={category.id} style={{ width: "auto" }}>
                                <div 
                                    className={Styles.category__action} 
                                    onClick={() => clickAction(category)}
                                >
                                    <span>{ category.name }</span>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default CategoryList