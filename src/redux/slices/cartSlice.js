import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;

                state.totalPrice = state.items.reduce((sum, obj) => {
                    return obj.price * obj.count + sum
                }, 0)
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
        },
        minusItem: (state, action) => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
})

export const selectorCart = (state)=> state.cartSlice;
export const selectorCartItemById = (id)=>state=>state.cartSlice.items.find(obj=> obj.id === id)

export const {addProduct, minusItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer