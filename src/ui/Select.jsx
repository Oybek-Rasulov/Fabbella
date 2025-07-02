import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image from '../features/Select/Image';
import Form from '../features/Select/Form';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from "../services/apiProducts";
import Loader from './Loader';
import Error from './Error';
import RelatedProduct from './RelatedProduct';

export default function Select() {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showImage, setShowImage] = useState(null);
  const { id } = useParams();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (!products) return;

    const selectedData = products.find((item) => item.id === Number(id));

    if (selectedData) {
      setSelectedProduct(selectedData);
      localStorage.setItem('selectedProduct', JSON.stringify(selectedData));
    } else {
      const local = localStorage.getItem('selectedProduct');
      if (local) setSelectedProduct(JSON.parse(local));
    }
  }, [id, products]);

  const takeShowImage = (img) => setShowImage(img);

  if(isLoading) return <Loader />
  if(isError) return <Error errorMessage="Ma'lumotlar yuklanmadi ☹️" />

  return (
    <>
        <div className="select">
          <Image selectedImages={selectedProduct.product_images} showImage={showImage} />
          <Form selectedProduct={selectedProduct} takeShowImage={takeShowImage} />
        </div>
        <RelatedProduct category={selectedProduct.product_type} />
    </>
  );
}
