import { assets } from '../Products'
import { Link } from 'react-router-dom'
import Star from '../../../ui/Star';

export default function Item({id, name, images, description, rate, price, discount}) {
    return (
        <Link to={"/selection/"+id} className='product-link' key={id} onClick={() => window.scrollTo(0, 0)}>
            <div className="item">  
                {/* <ImageCarousel images={images} /> */}
                <img src={images[0]?.image} alt="item" className='product-img' />
                <div className="item-content">
                    <p className='item-title'>{name}</p>
                    <p className='item-title-content'>{description}</p>
                    <Star starNum={rate} />
                    <del className='delete-price'>{new Intl.NumberFormat('ru-RU').format(price)}</del>
                    <p className='price'>{new Intl.NumberFormat('ru-RU').format(discount)} so'm</p>
                    <button className='btn-link'> Tanlash <img src={ assets.bagOrder } alt="Bag icon" /> </button>
                </div>
            </div>
        </Link>
    )
}
