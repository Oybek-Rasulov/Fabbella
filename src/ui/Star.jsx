import assets from "../services/assets";

export default function Star({ starNum }) {
    const displayRate = typeof starNum === "number" && !isNaN(starNum)
        ? starNum.toFixed(1)
        : "0.0";

    return (
        <div className='stars'>  
            <img src={assets.star} alt="rating" className="mr05" /> {displayRate}      
        </div>
    );
}
