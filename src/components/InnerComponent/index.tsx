import { useState } from 'react';
import Dashboard from '../../views/Dashboard';

import Sidebar from '../Sidebar';
// import Header from "../Header/Header"

const InnerComponent = () => {
    const [ isWide, setIsWide ] = useState(false);

    return (
        <>
            <Sidebar />
            <div className={`main__content ${isWide && "active"}`} >
                <div className="outlet" style={{padding: "20px"}}>
                    <Dashboard />
                </div>
            </div>
        </>
    )
}

export default InnerComponent