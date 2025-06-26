import AdminBarChart from "./AdminBarChart";
import Cart from "./Cart";
import { useQuery } from '@tanstack/react-query';
import { getOrders } from "../../../services/apiOrders";
export default function Dashboard() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
    });

    if (isLoading) return <p>Yuklanmoqda...</p>;
    if (isError) return <p>Xatolik: {error.message}</p>;

    return (
        <div className="admin-dashboard">         
            <div className="carts">
                <Cart value={`Buyurtmalar soni ${data.length}`} />
                <Cart value="Sotuvchilar soni 240" />    
            </div>   
              
            <AdminBarChart />
        </div>
    );
}
