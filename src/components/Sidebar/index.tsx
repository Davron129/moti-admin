import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { BiCategory } from 'react-icons/bi';
import { GiHotMeal } from 'react-icons/gi';
import { FiMenu } from 'react-icons/fi';
import { IconType } from "react-icons";

import {
    SidebarBrand,
    SidebarItem,
    SidebarMenu,
    ImageWrapper
} from './SidebarComponents';

import Logo from '../../assets/images/logo.png';
import Styles from './SidebarStyles.module.css';

import { API } from "../../utils/constants";
import { newBooking, newOrder } from "../../utils/functions/toast";
import SockJS from "sockjs-client";
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

const Sidebar = ({ isWide, setIsWide }: { isWide: boolean, setIsWide: Function}) => {
    const isMounted = useRef<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isMounted.current) {
            const url = `${API}/api/auth/mb-websocket`;
            const sock = new SockJS(url);
            const stompClient = Stomp.over(sock);
            stompClient.connect({}, function() {
                stompClient.subscribe("/topic/booking", function(data: any) {
                    dispatch({ type: "BOOKED", payload: true });
                    newBooking();
                })

                stompClient.subscribe("/topic/order", function(data: any) {
                    dispatch({ type: "ORDERED", payload: true });
                    newOrder();
                })
            })
        }
        return () => {
            isMounted.current = false;
        }
    }, [dispatch])

    return (
        <div className={`${Styles.sidebar} ${ isWide && Styles.wide }`}>
            <SidebarBrand>
                {
                    !isWide && <ImageWrapper>
                        <img src={Logo} alt="Moti Logo" onClick={() => setIsWide((prev: boolean) => !prev)} />
                    </ImageWrapper>
                }
                <div className={Styles.burger} onClick={() => setIsWide((prev: boolean) => !prev)}>
                    <FiMenu />
                </div>
            </SidebarBrand>
            <SidebarMenu>
                <ul className={Styles.sidebar__ul}>
                    {
                        sidebarItems.map(item => (
                            <SidebarItem key={item.content} onClick={() => setIsWide(true)}>
                                <NavLink to={item.link} className={Styles.sidebar__link} >
                                    <div className={Styles.sidebar__icon}><item.icon width={20} fill="#777D82" /></div>
                                    <span className={Styles.item__text}>{ item.content }</span>
                                </NavLink>
                            </SidebarItem>
                        ))
                    }
                </ul>
            </SidebarMenu>
            <ToastContainer
                position="top-right"
                autoClose={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </div>
    )
}

export default Sidebar