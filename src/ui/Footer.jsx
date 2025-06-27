import assets from '../services/assets'
import { Link } from 'react-router-dom'

export default function Footer() {  
    return (
        <footer className='footer'>
            <div className='footer-details'>
                <div className='footer-details-content'>
                    <img src={assets.logo} alt="Logo" className='footer-logo' />
                    <h1 className='footer-title'>Fabbella</h1>
                </div>
                <Link href="/contact">
                    <img src={assets.telephone} alt="telephone" />
                    <p>+9989 91 401 47 66</p>
                </Link>
                <Link href="/contact">
                    <img src={assets.map} alt="Map" />
                    <p>Bosh Ofis Toshkent shahri, Sergeli tumani</p>
                </Link>
            </div>

            <div className='footer-about'>
                <h1 className='footer-title'>Biz haqimizda</h1>
                <p>Fabbella ozbekistondagi ayollar hamda qizlar uchun online do'/kon bolib siz unda <Link to="/adminboard/login"> ozinggizga </Link> yoqqan mahsulotlarni online tarzda xarid qilishingiz mumkin. Yetkazib berish xizmati bizda har doim mavjud 😊❤️ </p>
                <div className='social-container'>
                    <Link to="https://www.instagram.com/fabbella_uz">
                        <img src={assets.instagram} alt="Instagram" />
                    </Link>
                    <Link to="https://t.me/+bCno-U8wRSg0M2Ey">
                        <img src={assets.telegram} alt="Telegram" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
