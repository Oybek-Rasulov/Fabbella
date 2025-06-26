import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './features/Orders/orderSlice.js';

const store = configureStore({
    reducer: {
        orders: ordersReducer,

    }
})

export default store;