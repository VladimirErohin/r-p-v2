import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import GetCartFromLs from '../../../utils/getCartFromLS';
import {CartItemType, CartSliceState} from "./types";
import calcTotalPrice from "../../../utils/calcTotalPrice";

const initialState: CartSliceState = GetCartFromLs();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItemType>) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;

                // state.totalPrice = state.items.reduce((sum, obj) => {
                //     return obj.price * obj.count + sum
                // }, 0)
                state.totalPrice = calcTotalPrice(state.items)

            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const {addProduct, minusItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer