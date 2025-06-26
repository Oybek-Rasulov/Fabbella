import OrderList from "./OrderList";

export default function Order({ order }) {

    return (
            <div className='orders'>
                <OrderList order={order} />
            </div>
        )
}