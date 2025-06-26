import { useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '../../services/assets';
import { useDispatch } from 'react-redux';
import { addItem } from '../Orders/orderSlice';
import Quantity from './Quantity';

export default function Form({ selectedProduct }) {
    const dispatch = useDispatch();
    const [ size, setSize ] = useState("");
    const [ isSizeSelected, setIsSizeSelected ] = useState(true);
    const [ quantity, setQuantity ] = useState(1)

    console.log(selectedProduct)

    // Storing Size 
    const takeSize = (value) => {
        setSize(value);
        setIsSizeSelected(true);
    }

    async function productDetails(order) {

        if (size.length > 0) {
            const orderId = Date.now();
            const madeOrder = {...order, size: size, quantity: quantity, orderId: orderId}
            dispatch(addItem(madeOrder))  
        }else {
            setIsSizeSelected(false)
        }

    }

    function decreaseQuantity() {
        setQuantity((current) => current > 1 ? current - 1 : current)
    }

    function increaseQuantity() {
        setQuantity((current) => current + 1)
    }

    return (
        <div className="select-details">
            <h2 className="product-title mb1">{selectedProduct.name} <span className='rate'> 4.9 <img src={assets.star} alt="star" className='star-icon' /></span></h2>
            <p className="product-description mb1">{selectedProduct.description}</p>
            <div className='mb2'>
            </div>
            <div className='mb1'>
                <p className="select-title mb1">O'lchamini tanlang!</p>
                {selectedProduct.product_sizes?.map((size) => (
                    <button
                        key={size.id}
                        className='size-button'
                        onClick={() => takeSize(size.size)}
                    >
                        {size.size}
                    </button>
                ))}

                { isSizeSelected ? '' : <p className='error' style={{product: 'red'}}>Oops, Kiyimingiz o'lchamini belgilang ❤️</p>}
            </div>
            <p className="select-title mb1">Mahsulot soni</p>
            <Quantity onClickDec={decreaseQuantity} onClickInc={increaseQuantity}>
                {quantity}
            </Quantity>
            <div className='select-price'>
                <del className="delete-price">{new Intl.NumberFormat('ru-RU').format(selectedProduct.fake_price)} so'm</del>
                <p className="price">{new Intl.NumberFormat('ru-RU').format(selectedProduct.price)} So'm</p>
            </div>
    
            {size.length > 0 ? <button className='submit-button-on btn-absolute' onClick={() => productDetails(selectedProduct)}> <Link to='/orders' className='submit-link'>Savatga yuklash </Link> </button> : <button className='submit-button-on submit-button-off btn-absolute' onClick={() => setIsSizeSelected(false)}>Savatga yuklash </button>}
    </div>
    )
}