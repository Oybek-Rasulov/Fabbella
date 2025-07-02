import { useEffect, useState } from 'react';
import Item from '../features/Products/product/Item';
import { getProducts } from '../services/apiProducts';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import Error from './Error';
import Title from './Title';

export default function RelatedProduct({ category }) {
    const [relatedProduct, setRelatedProduct] = useState([]);

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),
    })
    
    useEffect(() => {
        async function handleRelatedProduct() {
            if(!category) return;

            const relatedProducts = products.filter((product) => product.product_type === category )
            setRelatedProduct(relatedProducts)
        }  

        handleRelatedProduct()
    }, [category])

    if(isLoading) return <Loader />
    if(isError) return <Error errorMessage={isError.message} />

    return (
        <> 
                <Title title="Shunga oid" className='ml1' />
            <div className='product container'>
                {relatedProduct.map((product) => { return <Item
                    key={product?.id}
                    id={product?.id}
                    name={product?.name}
                    images={product?.product_images}
                    description={product?.description}
                    rate={product?.rate}
                    price={product?.fake_price}
                    discount={product?.price}
                />})}
            </div>
        </>
    )
}
