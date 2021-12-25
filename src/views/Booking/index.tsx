import { useState, useEffect, useRef } from "react";
// import { Link } from 'react-router-dom';
import Api from "../../utils/network/api";
import { useSelector } from "react-redux";

import "./Booking.css"

interface BookingInterface {
    active: boolean;
    description: string;
    id: string;
    phone: string;
}

interface RootState {
    booking: boolean;
    order: boolean;
}

const Booking = () => {
    const isMounted = useRef<boolean>(true);
    const [ bookings, setBookings ] = useState<BookingInterface[]>([]);
    const isBookingChanged = useSelector((state: RootState) => state.booking);

    useEffect(() => {
        new Api()
            .getBookings()
            .then(({data}) => {
                if(isMounted.current) {
                    setBookings(data.data)
                }
            })
        return () => {
            isMounted.current = false;
        }
    }, [isBookingChanged])

    // const [ computers, setComputers ] = useState([]);
    // const [ isMounted, setIsMounted ] = useState(true);
    // const [ bookingList, setBookingList ] = useState([]);

    return (
        <>
            <section className="section__card mb-3">
                <div className="section__header">
                    <h3>Booking List</h3>
                </div>
                <div className="section__table table__responsive">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Phone Number</th>
                                <th>Descripton</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((booking, index) => (
                                    <tr key={booking.id}>
                                        <td>{ index + 1 }</td>
                                        <td>{ booking.phone }</td>
                                        <td>{ `${booking.description}` }</td>
                                        <td>{ booking.active ? "Active" : "aktiv emas" }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Booking

