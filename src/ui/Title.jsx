import assets from '../services/assets';
import PropTypes from 'prop-types';

export default function Title({title, className = ''}) {
    return (
        <div className={` ${className} title`}>
            <h2>{ title }</h2>
            <img src={assets.downArrow} className="w-[20px]" alt="Arrow" /> 
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
  };