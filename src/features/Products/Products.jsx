import assets from "../../services/assets";
import Item from './product/Item';
import Loader from "../../ui/Loader";
import { useSearch } from "../../context/SearchContext";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from "./productSlice";

export { assets };

export default function Products() {
    const { searchValue } = useSearch();
    const filteredByCategory = useSelector(selectProducts); // ✅ From Redux store
    const [searchedProducts, setSearchedProducts] = useState([]);
    
    useEffect(() => {
        if (!searchValue) {
            setSearchedProducts(filteredByCategory);
        } else {
            const result = filteredByCategory.filter(product =>
                product.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setSearchedProducts(result);
        }
    }, [searchValue, filteredByCategory]); // ✅ update when either changes

    if (!filteredByCategory) return <Loader />; // Show loader if redux store not ready

    return (
        <div className="product">
            {searchedProducts.map((product) => (
                <Item
                    key={product?.id}
                    id={product?.id}
                    name={product?.name}
                    images={product?.product_images}
                    description={product?.description}
                    rate={product?.rate}
                    price={product?.fake_price}
                    discount={product?.price}
                />
            ))}
        </div>
    );
}
