import assets from '../../services/assets';
import { Link } from 'react-router-dom';
import NoItem from '../../ui/noItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders, removeItem, increaseItemQuantity, decreaseItemQuantity, getTotalPrice, getTotalPriceWithoutDiscount } from './orderSlice';
import Quantity from '../Select/Quantity';

export default function OrderList() {
    const dispatch = useDispatch();

    const orders = useSelector(getOrders);
    const total = useSelector(getTotalPrice);
    const totalWithoutDiscount = useSelector(getTotalPriceWithoutDiscount)
    const matches = useMediaQuery('(max-width:1024px)');

    return (
        <div className='orders-details'>
            {
                !orders.length 
                ? <NoItem /> 

                : orders.map((order, i) => matches 
                ? <ul key={i} className="order-list">
                    <li className="order-image"><img src={order.product_images[0].image} alt="dress" /></li>
                    <div className='order-details-container'>
                        <li className="order-title">{order.name}</li>
                        <li className="order-size">O'lchami: {order.size}</li>
                        <li className="order-size"><Quantity className='order-inc-dec' onClickDec={() => dispatch(decreaseItemQuantity(order.orderId))} onClickInc={() => dispatch(increaseItemQuantity(order.orderId))}> Soni: {order.quantity} </Quantity></li>
                        <li className="order-price">
                            <div className="sub-price">
                                <p className="fake-price">{new Intl.NumberFormat('ru-RU').format(order.fake_price)} So'm</p>
                                <p className="actual-price">{new Intl.NumberFormat('ru-RU').format(order.price)} So'm</p>
                            </div>    
                        </li> 
                        <li className="order-remove"><button title="O'chirish" className='remove-order-btn' onClick={() => {dispatch(removeItem(order.orderId))}} >Olib tashlash<img src={assets.removeIcon} alt="Remove Icon" /></button></li>  
                    </div> 
                </ul> 
                : <ul key={i} className="order-list">
                    <li className="order-image"><img src={order.product_images[0].image} alt="dress" /></li>
                    <li className="order-title">{order.name}</li>
                    <li className="order-size">{order.size}</li>
                    <li className="order-size"> <Quantity onClickDec={() => dispatch(decreaseItemQuantity(order.orderId))} onClickInc={() => dispatch(increaseItemQuantity(order.orderId))}> Soni: {order.quantity} </Quantity></li>
                    <li className="order-price">
                        <div className="sub-price">
                            <p className="fake-price">{new Intl.NumberFormat('ru-RU').format(order.fake_price)} So'm</p>
                            <p className="actual-price">{new Intl.NumberFormat('ru-RU').format(order.price)} So'm</p>
                        </div>    
                    </li>  
                    <li className="order-remove"><button title="O'chirish" className='remove-order-btn' onClick={() => {dispatch(removeItem(order.orderId))}} >Olib tashlash<img src={assets.removeIcon} alt="Remove Icon" /></button></li>  
                </ul>)
            }
            {orders.length > 0 ? <div className='order-last-details'>
                <h3>Sizning Buyurmangiz:</h3>
                <p>{orders.length} ta mahsulot</p>
                <p>Chegirma: -{new Intl.NumberFormat('ru-RU').format(totalWithoutDiscount - total)} So'm</p>
                <h4 className='total-price'>Hammasi: {new Intl.NumberFormat('ru-RU').format(total)} So'm</h4>
                </div> : ""}
            <div className='final-order'>
                <button className='add-more-btn'><Link to="/">Mahsulot qo'shish</Link></button>
                { orders.length > 0 ? <button className='add-more-btn'><Link className='order-link' to="/orderForm">Buyurtma qilish</Link></button> : ""}
            </div>
        </div>
    )
}
