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

interface SideItems {
    "content": string,
    "icon": IconType,
    "link": string
}

const sidebarItems: SideItems[] = [
    {
        content: "Kategoriyalar",
        icon: BiCategory,
        link: "/categories"
    },
    {
        content: "Taomlar",
        icon: GiHotMeal,
        link: "/foods"
    }
]

const Sidebar = () => {
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