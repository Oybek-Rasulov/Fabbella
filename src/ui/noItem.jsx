import assets from "../services/assets"

function NoItem({ className = '', text}) {
    return (
        <div className={`${className && className} no-item`}>
            <img src={assets.noItem} alt="yoga woman" />
            { text && <p className="bold-text"> {text} </p>}
        </div>
    )
}

export default NoItem
