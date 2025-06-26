
export default function Quantity({ onClickDec, onClickInc, children, className="" }) {

    return (
        <>
            <div className='order-quantity'>
                <button className={`${className} order-decrease`} title="Mahsulot ayirish" onClick={onClickDec}>-</button>
                <p id={className} >{children}</p>
                <button className={`${className} order-increase`} title="Mahsulot qo'shish" onClick={onClickInc}>+</button>
            </div>
        </>
    )
}
