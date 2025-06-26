import axios from 'axios';
import { useEffect, useState } from 'react';
import Item from '../components/Home/product/item'

export function RelatedProduct({ category }) {
    const [relatedProduct, setRelatedProduct] = useState([]);

    async function relatedProductSubmit() {
        await axios.post("http://localhost:3001/relatedProduct", {category})
            .then(res => setRelatedProduct(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        relatedProductSubmit()
    }, [category])

    return (
        <> 
            <div className='product container'>
                {relatedProduct.map((product) => { return <Item key={product.id} id={product.id} name={product.name} imgAddress={product.img1} description={product.description} rate1={product.rate1} rate2={product.rate2} rate3={product.rate3} rate4={product.rate4} rate5={product.rate5} price={product.price} discount={product.discount} />})}
            </div>
        </>
    )
}
