import assets from "../services/assets";
import { Link } from "react-router-dom";

export default function Orders() {

    return (
        <>
            <div className="ordered-success">

                <div className="ordered-success-back">
                    <Link to="/"><img src={assets.goBack} alt="icon" /></Link>
                </div>
                <img className="ordered-success-image" src={assets.orderSuccess} alt="check" />
                <h1>Bizni tanlaganingiz uchun Rahmat 😍</h1>
                <h1 className="title">Siz bilan tez orada bog'lanamiz 🛍️📱📞</h1>
            </div>
        </>
    )
}