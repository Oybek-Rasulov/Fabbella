import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import assets from "../../../services/assets";
import { getProducts } from "../../../services/apiProducts";
import Star from "../../../ui/Star";
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from "../../../services/apiProducts";
import { useQueryClient } from '@tanstack/react-query';

function ProductPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['product'],
        queryFn: getProducts,
    });

    const mutation = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['products'])
            navigate('/adminboard/products');
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
        }
    });

    useEffect(() => {
        if (data) {
            const order = data.find(order => parseInt(order.id) === parseInt(id));
            if (order) setProduct(order);
        }
    }, [data, id]);

    function handleDelete(id) {
        mutation.mutate(id);
    }

    if (isLoading) return <p>Loading orders...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    if (!product) return <p>Loading order details...</p>; 

    return (
        <div>
            <div className="admin-order-img order-main">
                {product.product_images && product.product_images.map((image, index) =>  <img key={index} className="mb1" src={image.image} alt="order" />)}
            </div>
            <div>
                <h3 className="order-main-title">Mahsulot malumotlari ℹ️</h3>
                <ul>
                    <li className='user'> <span className="mr05"> Nomi: </span> {product.name}</li>
                    <li className='phone-number'> <span className="mr05"> Tarifi: </span> {product.description}</li>
                    <li className='admin-product-rating'> <span className="mr05"> Reytingi: </span> <Star starNum={product.rate}/></li>
                    <li className="admin-product-rating"> <span className="mr05"> O'lchamlari: </span> {product.product_sizes.map((sizes) => <p key={sizes.id} >{sizes.size  + " , "}</p>)} 🧥</li>
                    <li> <span className="mr05"> Soni: </span> {product.quantity} 🛒</li>
                    <li> <span className="mr05"> Mahsulot turi: </span> {product.product_type} ⚙️</li>
                    <li className="delete-price"> <span className="mr05"> Narxi: </span> <del> {new Intl.NumberFormat('ru-RU').format(product.fake_price)} </del> So'm 💰</li>
                    <li className="order-price mb1"> <span className="mr05"> Aksiyadagi narxi: </span> {new Intl.NumberFormat('ru-RU').format(product.price)} So'm 💰</li>
                    <li className="order-li"> <button className="delete-order-btn" onClick={() => handleDelete(product.id)} disabled={mutation.isLoading}> <span className="mr05"> O'chirish </span> <img src={assets.removeIcon} alt="delete" /></button></li>
                </ul>
            </div>
        </div>
    );
}

export default ProductPage;

