import assets from '../../services/assets'
import {Link} from 'react-router-dom'

export default function GoBack() {
    return (
        <>
            <div className='goback' onClick={() => {window.location.reload()}}>
                <Link to="/" className='link' >
                    <img className='goback-arrow' src={assets.leftArrow} alt="Arrow" />
                </Link>
            </div>
        </>
    )
}
