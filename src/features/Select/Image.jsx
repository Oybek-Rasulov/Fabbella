import { useState } from 'react'; 
import { useEffect } from 'react';

export default function Image({ selectedImages }) {
    // Setting selected image
    const [ image, setImage] = useState("");

    function imageFunc(selectedImg) {
        setImage(selectedImg)   
    }

    useEffect(() => {
        if (selectedImages) {
            setImage(selectedImages[0]?.image)
        }
    }, [selectedImages])


    return (
            <div className="product-image">
                <div className="other-images">
                    {selectedImages && selectedImages.map((item, index) => <button key={index} onClick={ () => {imageFunc(item.image)}}><img src={item.image} alt="product" /></button> )}
                </div>
                <div className="main-image">
                    <img src={image && image} alt="product" />
                </div>
            </div>
    )
}
