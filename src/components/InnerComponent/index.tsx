import { useState } from 'react';

import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom'

const InnerComponent = () => {
    const [ isWide, setIsWide ] = useState(true);

    return (
        <>
            <Sidebar isWide={isWide} setIsWide={setIsWide}  />
            <div className={`main__content ${isWide && "active"}`} >
                <div className="outlet" style={{padding: "20px"}}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default InnerComponent