import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const errorMsg = (msg: string) => toast.error(msg, {
    autoClose: 3000,
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
});

export const succesMsg = (msg:string) => toast.success(msg, {
    autoClose: 3000,
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
})

export const newOrder = () => toast.success(NewOrderLink, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const newBooking = () => toast.success(NewBookingLink, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const NewOrderLink = () => <div><Link to="/order">Yangi buyurtma qabul qilindi!</Link></div>;

const NewBookingLink = () => <div><Link to="/booking">Yangi joy band qilindi!</Link></div>;