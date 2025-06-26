import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from "../../../services/apiOrders";
import Loader from "../../../ui/Loader";
import Error from "../../../ui/Error";
import { deleteOrder, confirmOrder } from "../../../services/apiOrders";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function AdminOrderContent() {
    const [currentOrder, setCurrentOrder] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
    });
    
    useEffect(() => {
        if(!data) return

        if(!id) return

        const filteredOrder = data.find(order => parseInt(order.id) === parseInt(id));
        if (!currentOrder) return <Error errorMessage="Buyurtma topilmadi!" />
        setCurrentOrder(filteredOrder)
    }, [data, id]);

    const { mutate: deleteMutate, isLoading: deleteLoading, isError: deleteError } = useMutation({
        mutationFn: (id) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
            toast.success("Buyurtma o'chirildi!");
            navigate('/adminboard/orders')

        },
        onError: (error) => {
            console.error('Error deleting order:', error.message);
        }
    })

    const { mutate: confirmMutate, isLoading: confirmLoading, isError: confirmError } = useMutation({
        mutationFn: (id) => confirmOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['orders'])
            toast.success("Buyurtma tasdiqlandi!")
        }
    })

    
    function handleDelete(id) {
        deleteMutate(id)
    } 
    
    function handleConfirm(id) {
        confirmMutate(id)
    }

    if(isLoading) return <Loader />
    if(deleteLoading) return <Loader />
    if(confirmLoading) return <Loader />
    if(isError) return <Error errorMessage={isError.message} />
    if(deleteError) return <Error errorMessage={deleteError.message} />
    if(confirmError) return <Error errorMessage={confirmError.message} />
    
    const rawDate = currentOrder?.created_at;
    const formatted = rawDate ? new Date(rawDate).toISOString().split("T")[0] : "Noma'lum sana";
    const totalPrice = currentOrder.orders?.reduce((acc, order) => acc + order.total_discount_price, 0);

    return (
        <div className="order-main">
            <div>
                <h3 className="order-main-title">{currentOrder.orders?.length} ta Buyurtma 🛍️</h3>
                {
                    currentOrder.orders?.map((order) => <div key={order.id} className="order-page-order" >
                        <div className="order-page-image">
                            {order.products.product_images.map((image) => <img key={image.id} src={image.image} alt="order image" />)}
                        </div>
                            <ul>
                                <li> <span> Mahsulot nomi: </span> {order.products.name} 👗</li>
                                <li> <span> Tarifi: </span> {order.products.description} ℹ️</li>
                                <li> <span> Mahsulot turi: </span> {order.products.product_type} ⚙️</li>
                                <li> <span> Mahsulot soni: </span> {order.quantity} ta 📦</li>
                                <li> <span> O'lchami: </span> {order.size} 🔢</li>
                                <li> <span> Mahsulot narxi: </span> {order.products.price} 💰</li>
                                <li className="mb1"> <span> Umumiy: </span> {order.total_discount_price} 💰</li>

                            </ul>
                    </div>)
                }
            </div>
            <div className="admin-order-address">
                <h3 className="order-main-title">Buyurtma manzili ℹ️</h3>
                <ul>
                    <li><span className="payment-status">{currentOrder.payment_status === "To'langan" ? "To'langan" : "To'lanmagan"}</span> <span className={`${currentOrder.orders_status === "Tasdiqlangan" && 'success'} payment-status`}>{currentOrder.orders_status}</span></li>
                    <li className='user'> <span> Ism Familya: </span> {currentOrder.fullname} 🙋‍♀️</li>
                    <li className='phone-number'> <span> Telefon raqami: </span> {currentOrder.phone_number} ☎️</li>
                    <li> <span> To'lov turi: </span> {currentOrder.payment_type} 💳</li>
                    <li> <span> Shahar: </span> {currentOrder.city} 🏠</li>
                    <li> <span> Region: </span> {currentOrder.region} 🏠</li>
                    <li> <span> Ko'cha nomi: </span> {currentOrder.street} 🏠</li>
                    <li className="mb1"> <span> Buyurtma qilingan sana: </span> {formatted} 🕒</li>
                    <li> <span> Hammasi: {totalPrice} 💵</span></li>
                    <li className="order-li"><button className="confirm-order-btn" onClick={() => handleConfirm(currentOrder.id)}> Tasdiqlash </button> <button className="delete-order-btn" onClick={() => handleDelete(currentOrder.id)}> <span> O'chirish </span> </button></li>
                </ul>
            </div>
        </div>
    );
}

export default AdminOrderContent;

