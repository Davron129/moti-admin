import { useState } from 'react';
import Dashboard from '../../views/Dashboard';

import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom'
// import Header from "../Header/Header"

const InnerComponent = () => {
    const [ isWide, setIsWide ] = useState(false);

    return (
        <>
            <Sidebar />
            <div className={`main__content ${isWide && "active"}`} style={{ backgroundColor: "#e5e5e5"}}  >
                <div className="outlet" style={{padding: "20px"}}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default InnerComponent