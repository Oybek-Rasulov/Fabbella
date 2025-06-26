import AllProduct from "./AllProduct";
import Title from '../../../ui/Title';
import AdminProductsSearch from "./AdminProductsSearch";

export default function AdminProducts() {

    return (
        <>
            <AdminProductsSearch />
            <Title title="Barcha Mahsulotlar" />
            <AllProduct />
        </>
    )
}
