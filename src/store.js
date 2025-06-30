import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './features/Orders/orderSlice.js';
import productsReducer from './features/Products/productSlice.js';

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        products: productsReducer,
    }
})

export default store;