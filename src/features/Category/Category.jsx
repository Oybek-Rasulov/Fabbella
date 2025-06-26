import { useState, useEffect } from 'react'
import axios from 'axios';
import assets from '../assets';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCategory } from '../../context/CategoryContext';
// Components
import ResponsiveCategory from './ReasponsivCategory';
import NormalCategory from './NormalCategory';

export {assets};
export default function Category () {
    const matches = useMediaQuery('(max-width:900px)');
    const {getCategory} = useCategory()

    // Setting value of category
    function categoryValue(value) {
        getCategory(value)
    }

    return (
      <>
        {matches ? <ResponsiveCategory categoryValue={categoryValue} /> : <NormalCategory categoryValue={categoryValue} />} 
      </>
    )
    };


