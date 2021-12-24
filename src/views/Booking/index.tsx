import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import "./Booking.css"


const Booking = () => {
    // const [ computers, setComputers ] = useState([]);
    // const [ isMounted, setIsMounted ] = useState(true);
    // const [ bookingList, setBookingList ] = useState([]);

    return (
        <>
            <section className="section__card mb-3">
                <div className="section__header">
                    <h3>Booking List</h3>
                    {/* <Link to="add">
                        <button>Booking List</button>
                    </Link> */}
                </div>
                <div className="section__table table__responsive">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Salom</td>
                                <td>Salom</td>
                                <td>Salom</td>
                                <td>Salom</td>
                            </tr>
                            <tr>
                                <td>Salom</td>
                                <td>Salom</td>
                                <td>Salom</td>
                                <td>Salom</td>
                            </tr>
                            <tr>
                                <td>Salom</td>
                                <td>Salom</td>
                                <td>Salom</td>
                                <td>Salom</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>

    )
}

export default Booking

