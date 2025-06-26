import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: JSON.parse(localStorage.getItem('orders')) || []
};


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addItem(state, action) {
            const newOrder = action.payload;

            // Calculate totalPrice before pushing
            const totalPrice = newOrder.quantity * newOrder.price;
            const withoutDiscount = newOrder.quantity * newOrder.fake_price;

            // Attach totalPrice to the order
            const orderWithTotal = {
                ...newOrder,
                totalDiscountPrice: totalPrice,
                totalPrice: withoutDiscount,
            };

            state.orders.push(orderWithTotal);
            const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
            savedOrders.push(orderWithTotal);
            localStorage.setItem('orders', JSON.stringify(savedOrders));

        },
        removeItem(state, action) {
            const orderId = action.payload;
            const updatedOrders = state.orders.filter(order => order.orderId !== orderId);
            state.orders = updatedOrders;
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
        },
        increaseItemQuantity(state, action) {
            const orderId = action.payload;
            const order = state.orders.find(order => order.orderId === orderId);
            order.quantity++;
            order.totalDiscountPrice = order.quantity * order.price;
            order.totalPrice = order.quantity * order.fake_price;
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        decreaseItemQuantity(state, action) {
            const orderId = action.payload;
            const order = state.orders.find(order => order.orderId === orderId);
            if(order.quantity <= 1) return;
            order.quantity--;
            order.totalDiscountPrice = order.quantity * order.price;
            order.totalPrice = order.quantity * order.fake_price;
            localStorage.setItem('orders', JSON.stringify(state.orders));
            if( order.quantity <= 0 ) {
                state.orders = state.orders.filter(order => order.id !== orderId)
            }
        },
        clearOrders(state) {
            state.orders = [];
        }
    }
})

export const { addItem, removeItem, increaseItemQuantity, decreaseItemQuantity, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;

export const getOrders = (state) => state.orders.orders;

export const getTotalQuantity = (state) => state.orders.orders.reduce((total, order) => total + order.quantity, 0)

export const getTotalPrice = (state) => state.orders.orders.reduce((total, order) => total + order.totalDiscountPrice, 0);

export const getTotalPriceWithoutDiscount = (state) => state.orders.orders.reduce((total, order) => total + order.totalPrice, 0)

export const getOrderLenght = (state) => state.orders.orders.length;