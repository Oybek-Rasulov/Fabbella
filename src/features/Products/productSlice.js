// productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getCategoryValue(state, action) {
      const { category, products } = action.payload;

      // Optional: normalize product_type and category
      const selectedCategory = category.toLowerCase();

      if (selectedCategory === 'all') {
        state.products = products;
      } else {
        state.products = products.filter(
          product => product.product_type?.toLowerCase() === selectedCategory
        );
      }
    }
  }
});

export const { getCategoryValue } = productsSlice.actions;
export default productsSlice.reducer;

// Selector to get filtered products
export const selectProducts = (state) => state.products.products;
