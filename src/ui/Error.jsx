import { Link } from "react-router-dom";
import assets from "../services/assets";

export default function Error({errorMessage}) {

    return (
        <div className="goBack">
            <h1>{errorMessage}</h1>
            <img src={assets.noItem} alt="error" />
            <Link to="/">Orqaga</Link>
        </div>
    )
}
