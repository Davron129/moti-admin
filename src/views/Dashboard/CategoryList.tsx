import Styles from './Dashboard.module.css';
import SwiperCore, { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode"

SwiperCore.use([FreeMode]);

type Category = {
    id: string;
    name: string;
    foods: []
}

type CategoryProps = {
    categories: Category[];
    isOverlayOpen: boolean;
    clickAction: Function
}

type Color = {
    color: string;
    shadow: string;
}

const CategoryColors: Color[] = [
    {
        color: "#FFEEED",
        shadow: "#F6B3B3"
    },
    {
        color: "#E6EAFF",
        shadow: "#E6EAFF"
    },
    {
        color: "#FFF5E4",
        shadow: "#F3DAB3"
    },
    {
        color: "#E6EAFF",
        shadow: "#B3C7FB"
    },
    {
        color: "#F1FFE6",
        shadow: "#D1F5B3"
    },
    {
        color: "#E6F0FF",
        shadow: "#B3EEF4"
    },
]

// har xil rangda chiqadigan biror nima qo`shish mumkin
const CategoryList = ({categories, isOverlayOpen, clickAction} : CategoryProps) => {
    return (
        <div className={Styles.categories}>
            <div className={`${Styles.category__inner} ${isOverlayOpen && Styles.category__active}`}>
                <Swiper slidesPerView={'auto'} freeMode={true} style={{
                    height: "100%"
                }} >
                    {
                        categories.map((category, index) => (
                            <SwiperSlide key={category.id} style={{ width: "auto" }}>
                                <div 
                                    className={Styles.category__action} 
                                    onClick={() => clickAction(category)}
                                    style={{
                                        backgroundColor: CategoryColors[index%6].color,
                                        boxShadow: `${CategoryColors[index%6].shadow} 0 3px 6px`
                                    }}
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