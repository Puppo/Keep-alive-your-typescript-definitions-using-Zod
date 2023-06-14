import { useEffect, useState } from "react";
import { z } from "zod";
import { Modal, ModalProps, Notification, Order } from "../components";
import { getOrders, OrderModel } from "../core";
import { order as orderUtils } from "../core/utils";
import { useParamsTypeSafe } from "../utils";

const OrderParamsSchema = z.object({
    id: z.coerce.number(),
})

function OrderPage() {
    const { id } = useParamsTypeSafe(OrderParamsSchema)
    const [order, setOrder] = useState<OrderModel>();
    const [error, setError] = useState<Error | null>(null);
    const [modal, setModal] = useState<ModalProps | null>(null);


    useEffect((): void => {
        function fetchOrders(): void {
            setError(null);
            getOrders()
                .then((orders) => {
                    setOrder(orders.find(o => o.id === id))
                })
                .catch((err: Error) => {
                    setError(err);
                });
        }
        fetchOrders();
    }, [id])

    const onView = (o: OrderModel): void => {
        if (orderUtils.isOrderWithView(o)) {
            setModal({
                title: "View Order",
                content: `${o.id} in viewing`,
                onClose: () => setModal(null),
            });
            return;
        }
        if (orderUtils.isOrderWithEdit(o)) {
            setModal({
                title: "Edit Order",
                content: `Order with id: ${o.id} in editing`,
                onClose: () => setModal(null),
            });
        }
    }

    const onDelete = (o: OrderModel) => {
        if (orderUtils.isOrderWithDelete(o)) {
            setModal({
                title: "Delete Order",
                content: `Order with id: ${o.id} in deleting`,
                onClose: () => setModal(null),
            });
        }
    }


    return <>
        {error && <Notification type='error' text={error.message} onClose={() => { setError(null) }} />}
        <div className="container is-fluid pt-5">
            <h1 className="title has-text-white">Order</h1>
            {order && <Order order={order} onView={onView} onDelete={onDelete} />}
        </div>
        {modal && <Modal title={modal.title} content={modal.content} onClose={modal.onClose} />}
    </>
}

export default OrderPage
