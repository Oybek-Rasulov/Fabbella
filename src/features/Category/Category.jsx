import useMediaQuery from '@mui/material/useMediaQuery';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/apiProducts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategoryValue } from '../Products/productSlice';
import ResponsiveCategory from './ReasponsivCategory';
import NormalCategory from './NormalCategory';
import Loader from '../../ui/Loader';

export default function Category() {
  const matches = useMediaQuery('(max-width:900px)');
  const dispatch = useDispatch();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // ✅ Automatically show all products on first load
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(getCategoryValue({ category: 'All', products }));
    }
  }, [products, dispatch]);

  // ✅ Called when a category is selected
  function categoryValue(value) {
    if (isLoading || !products) return;
    dispatch(getCategoryValue({ category: value, products }));
  }

  if (isLoading) return <Loader />;

  return (
    <>
      {matches ? (
        <ResponsiveCategory categoryValue={categoryValue} />
      ) : (
        <NormalCategory categoryValue={categoryValue} />
      )}
    </>
  );
}
