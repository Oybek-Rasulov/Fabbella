import { Link } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';

function AdminOrdersListItem({id, image, phone, orderStatus, date}) {
    const rawDate = date;
    const formatted = new Date(rawDate).toISOString().split("T")[0];

    return (
        <Link to={'/adminboard/order/' + id}>
                    <div className="admin-orders">
                        <div className='admin-orders-content'>
                            <img src={image} alt="user" className='admin-orders-image' /> 
                            <span>Buyurtma ID {id}</span>
                        </div>
                        <div className='admin-orders-content'> 
                            <p className='admin-orders-phone'><CallIcon /> {phone} </p>
                            <p className={`${orderStatus === 'Qabul qilinmagan' ? "order-confirmation" : 'success order-confirmation'}`}>{orderStatus}</p>
                        </div>
                        <span className='admin-order-date'>{formatted}</span>
                    </div>
        </Link>
    )
}

export default AdminOrdersListItem
