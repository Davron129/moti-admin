import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { BiCategory } from 'react-icons/bi'
import { GiHotMeal } from 'react-icons/gi';
import { IconType } from "react-icons";
import {
    SidebarBrand,
    SidebarItem,
    SidebarMenu,
    ImageWrapper
} from './SidebarComponents';

import Styles from './SidebarStyles.module.css';
import Logo from '../../assets/images/logo.png';

import SockJS from "sockjs-client";
import { useDispatch } from "react-redux";
import { API } from "../../utils/constants";
const Stomp = require('stompjs');

interface SideItems {
    "content": string,
    "icon": IconType,
    "link": string
}

const sidebarItems: SideItems[] = [
    {
        content: "Категории",
        icon: BiCategory,
        link: "/categories"
    },
    // {
    //     content: "Taomlar",
    //     icon: GiHotMeal,
    //     link: "/foods"
    // },
    {
        content: "Заказы",
        icon: GiHotMeal,
        link: "/order"
    },
    {
        content: "Бронирование",
        icon: GiHotMeal,
        link: "/booking"
    },
]

const Sidebar = () => {
    const isMounted = useRef<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isMounted.current) {
            const url = `${API}/api/auth/mb-websocket`;
            const sock = new SockJS(url);
            const stompClient = Stomp.over(sock);
            stompClient.connect({}, function() {
                stompClient.subscribe("/topic/booking", function(data: any) {
                    dispatch({ type: "BOOKED", payload: true })
                })

                stompClient.subscribe("/topic/order", function(data: any) {
                    dispatch({ type: "ORDERED", payload: true })
                })
            })
        }
        return () => {
            isMounted.current = false;
        }
    }, [dispatch])

    return (
        <div className={Styles.sidebar}>
            <SidebarBrand>
                <ImageWrapper>
                    <img src={Logo} alt="Moti Logo" />
                </ImageWrapper>
            </SidebarBrand>
            <SidebarMenu>
                <ul className={Styles.sidebar__ul}>
                    {
                        sidebarItems.map(item => (
                            <SidebarItem key={item.content}>
                                <NavLink to={item.link} className={Styles.sidebar__link} >
                                    <div className={Styles.sidebar__icon}><item.icon width={20} fill="#777D82" /></div>
                                    <span className={Styles.item__text}>{ item.content }</span>
                                </NavLink>
                            </SidebarItem>
                        ))
                    }
                </ul>
            </SidebarMenu>
        </div>
    )
}

export default Sidebar