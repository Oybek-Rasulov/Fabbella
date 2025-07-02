import { useRef } from 'react';
import assets from '../services/assets';
import { Link, NavLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderLenght } from '../features/Orders/orderSlice';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function Header() {
    const orderLength = useSelector(getOrderLenght);
    const matches = useMediaQuery('(max-width:1024px)');
    const navigate = useNavigate();
    const {getSearchValue, searchValue} = useSearch();
    const inputFocus = useRef(null);

    function handleSetSearch(search) {
        getSearchValue(search)
        navigate('/')
    }     
        
     return (
        <nav className="container">
            <div className='nav-main'>
                <Link to="/"><img src={assets.logo} alt="Logo" className="logo" /></Link>
                <form >
                    <div className="nav-content">
                        <input type="search" className="nav-search" name='search' value={searchValue} onChange={(e) => handleSetSearch(e.target.value)} placeholder="Mahsulot nomini kiriting..." ref={inputFocus} />
                        <button type="submit" className="btn nav-btn" disabled={true}><img src={assets.search} alt="search icon" /></button>
                    </div>
                </form>
            </div>
            {matches ? <div className='app-bar'>
                <ul>
                    <li><NavLink to="/"><HomeIcon /> <span> Bosh </span></NavLink></li>
                    <li className='product-length-container'><NavLink to="/orders"> {orderLength ? <span className='order-length'>{orderLength}</span> : ""} <ShoppingCartIcon /> <span> Korzina </span></NavLink></li>
                    <li><NavLink to="/shipping"> <ShoppingBagIcon /> <span> Buyurtmalarim </span></NavLink></li>
                </ul>
            </div> 
            :<div className='nav-main nav-special'>
                <p className='number'><img src={assets.telephone} alt="Call" className='icon responsive-icon' />+998 50 998 88 66</p>
                <ul className='nav-account'>
                    <li><Link to="/" title="Bosh"><img src={assets.house} alt="User icon" className="icon" /></Link></li>
                    <li><Link to="/orders" className="bag" title="Buyurtmalaringiz" ><img src={assets.bag} alt="Bag icon" className="icon" /> {orderLength ? <p>{ orderLength }</p> : ""}</Link></li>
                </ul>
            </div>
            }

        </nav>
    )
}
