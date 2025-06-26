import assets from '../../../services/assets';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../services/apiProducts';
import Loader from '../../../ui/Loader';
import Error from '../../../ui/Error';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAdminProductsSearch } from '../../../context/AdminProductsSearchContext';

export default function AllProduct() {
    const [searchedProducts, setSearchedProducts] = useState(null);

    
    const { data: products, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });
    
    const { searchValue } = useAdminProductsSearch();

    useEffect(() => {
        if (!searchedProducts) {
            setSearchedProducts("")
        }

        if(!products) return

        const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.description.toLowerCase().includes(searchValue.toLowerCase()) || product.product_type.toLowerCase().includes(searchValue.toLowerCase()));
        setSearchedProducts(filteredProducts)

    }, [ searchValue ])


    if(isLoading) return <Loader />

    if(isError) return <Error />

    return (
        <>      
            <div className='admin-orders-main'>
                <div className="admin">
                    {searchedProducts ? searchedProducts.map((product) => <Link key={product.id} to={`/adminboard/products/` + product.id}> <ul className="admin-orders">
                        <div className='product-images'>
                            {product.product_images.map((image) => <li key={image.id} className="order-image"><img src={image.image} alt="Order" /></li>)}
                            <li><h4> 👗 {product.name}</h4></li>
                        </div>
                        <li> 🛒 {product.quantity}</li>
                        <li className="order-price"> 💰 {new Intl.NumberFormat('ru-RU').format(product.price)} So'm</li>
                        {/* <li className="order-price"><button><img src={assets.removeIcon} alt="remove" className='remove-icon' /></button></li> */}
                    </ul> </Link>
                    ) : products.map((product) => <Link key={product.id} to={`/adminboard/products/` + product.id}> <ul className="admin-orders">
                    <div className='product-images'>
                        {product.product_images.map((image) => <li key={image.id} className="order-image"><img src={image.image} alt="Order" /></li>)}
                        <li><h4> 👗 {product.name}</h4></li>
                    </div>
                    <li> 🛒 {product.quantity}</li>
                    <li className="order-price"> 💰 {new Intl.NumberFormat('ru-RU').format(product.price)} So'm</li>
                    {/* <li className="order-price"><button><img src={assets.removeIcon} alt="remove" className='remove-icon' /></button></li> */}
                </ul> </Link>
                )}
                </div>
            </div>
        </>
    )
}