import { useState, useEffect, useRef } from "react";
import { ImLocation } from 'react-icons/im';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Api from "../../utils/network/api";
import Styles from './Order.module.css';

interface FoodInterface {
    id: string;
    name: string;
    sum: number;
    image: {
        hashId: string;
    }
}

interface FoodCountInterface {
    count: number;
    id: string;
    food: FoodInterface
}

interface OrderInterface {
    phone: string;
    id: string;
    active: boolean;
    lan: number;
    lat: number;
    foodCounts: FoodCountInterface[]
}

interface RootState {
    booking: boolean;
    order: boolean;
}

const Order = () => {
    const isMounted = useRef<boolean>(true);
    const isOrderChanged = useSelector((state: RootState) => state.order);
    const [ orders, setOrders ] = useState<OrderInterface[]>([]);

    const getOrders = () => {
        new Api()
            .getOrders()
            .then(({data}) => {
                if(isMounted.current) {
                    setOrders(data.data);
                }
            })
    }

    const changeOrderStatus = (id: string) => {
        new Api()
            .changeOrderStatus(id)
            .then(() => {
                getOrders();
            })
    }

    useEffect(() => {
        isMounted.current = true;
        // toast.dismiss()

        getOrders();

        return () => {
            isMounted.current = false;
        }
    }, [isOrderChanged])

    return (
        <>
            <section className="section__card mb-3">
                <div className="section__header">
                    <h3>Order List</h3>
                    {/* <Link to="add">
                        <button>Booking List</button>
                    </Link> */}
                </div>
                <div className="section__table table__responsive">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Phone Number</th>
                                <th>Order</th>
                                <th>Location</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => (
                                    <tr key={order.id}>
                                        <td>{ index + 1 }</td>
                                        <td>{ order.phone }</td>
                                        <td>
                                            <div className={Styles.order__card}>
                                                <div>
                                                    {
                                                        order.foodCounts.map(food => (
                                                            <div className={Styles.order__foods} key={food.id}>
                                                                <span className={Styles.food}>{food.food.name}</span>
                                                                <span className={Styles.count}>x{food.count}</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: "32px"}}>
                                                <a target={"_blank"} rel="noreferrer" href={`https://maps.google.com/maps?q=${order.lat},${order.lan}&ll=${order.lat},${order.lan}&z=16`}>
                                                    <ImLocation  />
                                                </a>
                                            </div>
                                        </td>
                                        <td>{ order.foodCounts.reduce((prev: number, el:FoodCountInterface) => prev + (el.count * el.food.sum), 0) } so'm</td>
                                        <td>
                                            <div 
                                                className={`status ${order.active && "active"}`}
                                                onClick={() => changeOrderStatus(order.id)}    
                                            >
                                                <span></span>
                                            </div>
                                        </td>
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

export default Order

