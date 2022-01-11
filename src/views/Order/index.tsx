import { useState, useEffect, useRef } from "react";
import { ImLocation } from 'react-icons/im';
import { useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";
import Api from "../../utils/network/api";
import Styles from './Order.module.css';
import { succesMsg } from "../../utils/functions/toast";
import ConfirmModal from "../../components/modals/ConfirmModal";

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
    const [ orders, setOrders ] = useState<OrderInterface[]>([]);
    const [ selectedOrder, setSelectedOrder ] = useState<string>("");
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const isOrderChanged = useSelector((state: RootState) => state.order);

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

    const deleteOrder = (id:string) => {
        new Api()
            .deleteOrder(id)
            .then(() => {
                getOrders();
                setIsModalOpen(false);
                succesMsg("Бронирование успешно удалено");
            })
    }

    const handleClick = (id: string) => {
        setIsModalOpen(true);
        setSelectedOrder(id);
    }

    useEffect(() => {
        isMounted.current = true;
        getOrders();

        return () => {
            isMounted.current = false;
        }
    }, [isOrderChanged])

    return (
        <>
            <section className="section__card mb-3">
                <div className="section__header">
                    <h3>Список заказа</h3>
                </div>
                <div className="section__table table__responsive">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Номер телефона</th>
                                <th>Заказ</th>
                                <th>Место заказа</th>
                                <th>Общая стоимость</th>
                                <th>Статус</th>
                                <th>Действия</th>
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
                                            <div style={{ width: "32px" }}>
                                                <a target={"_blank"} rel="noreferrer" href={`https://maps.google.com/maps?q=${order.lat},${order.lan}&ll=${order.lat},${order.lan}&z=16`}>
                                                    <ImLocation  />
                                                </a>
                                            </div>
                                        </td>
                                        <td>{ order.foodCounts.reduce((prev: number, el:FoodCountInterface) => prev + (el.count * el.food.sum), 0) } сум</td>
                                        <td>
                                            <div 
                                                className={`status ${order.active && "active"}`}
                                                onClick={() => changeOrderStatus(order.id)}    
                                            >
                                                <span></span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="icon__wrapper" onClick={() => handleClick(order.id)}>
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
                modalText="Do yo want to delete order?"
                closeModal={setIsModalOpen}
                acceptFunc={() => deleteOrder(selectedOrder)}    
            /> }
        </>

    )
}

export default Order

