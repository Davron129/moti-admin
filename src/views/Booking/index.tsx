import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { succesMsg } from "../../utils/functions/toast";

import ConfirmModal from "../../components/modals/ConfirmModal";
import Api from "../../utils/network/api";
import { BiTrash } from "react-icons/bi";

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
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ bookings, setBookings ] = useState<BookingInterface[]>([]);
    const [ selectedBooking, setSelectedBooking ] = useState<string>("");
    const isBookingChanged = useSelector((state: RootState) => state.booking);

    const getBookings = () => {
        new Api()
            .getBookings()
            .then(({data}) => {
                setBookings(data.data)
            })
    }

    const deleteBooking = (id: string) => {
        new Api()
            .deleteBooking(id)
            .then(() => {
                getBookings();
                setIsModalOpen(false);
                succesMsg("Бронирование успешно удалено");
            })
    }

    const handleClick = (id: string) => {
        setIsModalOpen(true);
        setSelectedBooking(id);
    }

    useEffect(() => {
        isMounted.current = true;
        getBookings();
        
        return () => {
            isMounted.current = false;
        }
    }, [isBookingChanged])

    const changeBookingStatus = (id: string) => {
        new Api()
            .changeBookingStatus(id)
            .then(() => {
                getBookings();
            })
    } 

    return (
        <>
            <section className="section__card mb-3">
                <div className="section__header">
                    <h3>Список бронирования</h3>
                </div>
                <div className="section__table table__responsive">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Номер телефона</th>
                                <th>Описание</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map((booking, index) => (
                                    <tr key={booking.id}>
                                        <td>{ index + 1 }</td>
                                        <td>{ booking.phone }</td>
                                        <td>
                                            <p className="description" style={{ whiteSpace: "pre-line"}}>
                                                { `${booking.description}` }
                                            </p>
                                        </td>
                                        <td>
                                            <div 
                                                className={`status ${booking.active && "active"}`}
                                                onClick={() => changeBookingStatus(booking.id)}    
                                            >
                                                <span></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="icon__wrapper" onClick={() => handleClick(booking.id)}>
                                                <BiTrash />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
            { isModalOpen && <ConfirmModal 
                modalText="Do yo want to delete booking?"
                closeModal={setIsModalOpen}
                acceptFunc={() => deleteBooking(selectedBooking)}    
            /> }
        </>
    )
}

export default Booking

