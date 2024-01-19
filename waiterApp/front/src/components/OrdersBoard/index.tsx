import { useState } from "react";
import { Order } from "../../types/Order"
import { OrderModal } from "../OrderModal";
import {Board, OrdersContainer } from "./styles"
import { api } from "../../utils/api";

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Order[];
    onCancelOrder: (orderId: string) => void;
}

export function OrdersBoard( {title, icon, orders, onCancelOrder}: OrdersBoardProps){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null) //pode ser tipo null ou Order
    const [isLoading, setIsLoading] = useState(false);

    function handleOpenModal(order: Order){
        setIsModalVisible(true)
        setSelectedOrder(order);

    }

    function handleCloseModal() {
        setIsModalVisible(false)
        setSelectedOrder(null)
    }

    async function handleCancelOrder() {
        setIsLoading(true);
        await api.delete(`/orders/${selectedOrder?._id}`)

        setIsLoading(false);
        setIsModalVisible(false);
        onCancelOrder(selectedOrder)

    }

    return (

    <Board>

        <OrderModal
            visible={isModalVisible}
            order={selectedOrder}
            onClose={handleCloseModal}
            onCancelOrder={handleCancelOrder}
            isLoading={isLoading}
        />

        <header>
            <span>{icon}</span>
            <strong>{title}</strong>
            <span>({orders.length})</span>
        </header>


        <OrdersContainer>
            {orders.map((order: Order)=> (
                 <button onClick={() => handleOpenModal(order)} type='button' key={order._id}>
                    <strong>Mesa {order.table}</strong>
                    <span>{order.products.length} Itens</span>
                </button>
            ))}


        </OrdersContainer>

    </Board>

    )
}
