import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "./slices/cart/slice";
import pizzas from "./slices/pizzasSlice";
import { useDispatch } from 'react-redux';
import filterSlice from "./slices/filter/slice";

export const store = configureStore({
    reducer: {
        filterSlice,
        cartSlice,
        pizzas,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = ()=>useDispatch<AppDispatch>();