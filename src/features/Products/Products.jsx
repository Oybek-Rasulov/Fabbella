import assets from "../../services/assets"
import Item from './product/item'
import { getProducts } from "../../services/apiProducts"
import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader";
import { useSearch } from "../../context/SearchContext";
import { useEffect, useState } from 'react';

export { assets }
export default function Products() {
    const [searchedProducts, setSearchedProducts] = useState(null);
    const {searchValue} = useSearch();
    
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    })
    
    useEffect(() => {
        if(!searchValue) {
            setSearchedProducts(null)
        }; 
        
        if(!products) return

        const searchedProducts = products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()))
        setSearchedProducts(searchedProducts)
    }, [searchValue])
    
    if(error) return <div> Malumotlar yuklanmadi ☹️ </div>
    if(isLoading) return <Loader />

    return (
        <div className="product">
            {/* {searchedProduct? searchedProduct.map((product) => { return <Item key={product.id} id={product.id} name={product.name} imgAddress={product.img1} description={product.description} rate={product.rate} price={product.price} discount={product.discount} />}) : products.map((product) => { return <Item key={product.id} id={product.id} name={product.name} imgAddress={product.img1} description={product.description} rate={product.rate} price={product.price} discount={product.discount} />})} */}
            {searchedProducts? searchedProducts.map((product) => { return <Item key={product.id} id={product.id} name={product.name} images={product.product_images} description={product.description} rate={product.rate} price={product.fake_price} discount={product.price} />}) : products.map((product) => { return <Item key={product.id} id={product.id} name={product.name} images={product.product_images} description={product.description} rate={product.rate} price={product.price} discount={product.discount} /> })}
        </div>
    )
}
