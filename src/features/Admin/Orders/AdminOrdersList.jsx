import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../../services/apiOrders';
import AdminOrdersListItem from './AdminOrdersListItem';
import Loader from '../../../ui/Loader';
import Error from '../../../ui/Error';
import NoItem from '../../../ui/noItem';
import { useEffect, useState } from 'react';
import { useAdminOrdersSearch } from '../../../context/AdminOrdersSearchContext';

function AdminOrdersList() {
    const [filteredOrders, setFilteredOrders] = useState([]); // Displayed list
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [btnClass, setBtnClass] = useState("all")

    const { searchValue } = useAdminOrdersSearch();

    const { data: orders, isLoading, error: isError } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
    });

    // Load all orders on first fetch
    useEffect(() => {
        if (orders) setFilteredOrders(orders);
    }, [orders]);

    // Apply search to the current filtered list (based on selected filter)
    useEffect(() => {
        if (!orders) return;

        let baseList = orders;

        // If a filter is selected, filter by status first
        if (selectedFilter) {
            baseList = orders.filter(
                (order) => order.orders_status.toLowerCase() === selectedFilter.toLowerCase()
            );
        }

        // Then apply search on top
        const searched = baseList.filter((order) =>
            order.phone_number.includes(searchValue) ||
            order.fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
            order.orders_status.toLowerCase().includes(searchValue.toLowerCase()) ||
            order.id.toString().includes(searchValue)
        );

        setFilteredOrders(searched);
    }, [searchValue, selectedFilter, orders]);

    const handleConfirmed = (status) => {
        setSelectedFilter(status);
    };

    if (isLoading) return <Loader />;
    if (isError) return <Error errorMessage={isError} />;
    if (!orders?.length) return <NoItem className="mt10" text="Buyurtmalar topilmadi" />;

    return (
        <div className="admin-orders-container">
            <div className='admin-orders-filter'>
                <button className={btnClass === 'all' ? btnClass : ""} onClick={() => {
                    handleConfirmed(null)
                    setBtnClass("all")
                }}>Barchasi</button>
                <button className={btnClass === 'confirmed' ? btnClass : ""} onClick={() => {
                    handleConfirmed('Qabul qilingan')
                    setBtnClass('confirmed')
                    }}>Qabul qilinganlar</button>
                <button className={btnClass === 'notConfirmed' ? btnClass : ""} onClick={() => {
                    handleConfirmed('Qabul qilinmagan')
                    setBtnClass('notConfirmed')
                    }}>Qabul qilinmaganlar</button>
                <button className={btnClass === 'delivering' ? btnClass : ""} onClick={() => {
                    handleConfirmed('Yetkazilmoqda')
                    setBtnClass('delivering')
                    }}>Yetkazilmoqda</button>
                <button className={btnClass === 'delivered' ? btnClass : ""} onClick={() => {
                    handleConfirmed('Yetkazildi')
                    setBtnClass('delivered')
                    }}>Yetkazilganlar</button>
            </div>

            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <AdminOrdersListItem
                        key={order.id}
                        id={order.id}
                        date={order.created_at}
                        image={order.orders[0]?.products?.product_images?.[0]?.image}
                        phone={order.phone_number}
                        orderStatus={order.orders_status}
                        fullName={order.fullname}
                    />
                ))
            ) : (
                <NoItem text="Mos buyurtmalar topilmadi" className="mt10" />
            )}
        </div>
    );
}

export default AdminOrdersList;
