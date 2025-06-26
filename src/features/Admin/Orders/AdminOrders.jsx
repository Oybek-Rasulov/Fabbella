import AdminOrdersList from './AdminOrdersList';
import Title from '../../../ui/Title';
import AdminOrdersSearch from './AdminOrdersSearch';

function AdminOrders() {

    return (
        <div className='admin-orders-main'>
            <AdminOrdersSearch />
            <Title title='Buyurtmalar' />
            <AdminOrdersList  />
        </div>
    )
}

export default AdminOrders
