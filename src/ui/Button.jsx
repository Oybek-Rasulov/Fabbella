import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


export default function Button({children, type, to, onClick}) {
    const btn = "rounded-md"

    if(type === "link") return <Link to={to}>{children}</Link>


    return <button className={btn} onClick={onClick}>{children}</button>
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
}
