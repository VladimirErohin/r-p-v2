import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";

export type PizzaType = {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    sizes: Array<number>,
    types: number[],
};

export enum Status{
    LOADING="loading",
    SUCCESS="success",
    ERROR="error",
};

interface PizzaSliceStateType {
    items: PizzaType[];
    status: Status;
    //status: "loading" | "success" | "error";
};

export type SearchPizzaParamsType = {
    order:string,
    sortBy:string,
    category:string,
    search:string,
    currentPage:string
};

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchPizzaParamsType>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params;
        // const response = await userAPI.fetchById(userId)
        // return response.data
        const {data} = await axios.get<PizzaType[]>(`https://63d2e6911780fd6ab9cf1692.mockapi.io/items?${category}${search}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}`)
        return data;

        // if (data.length === 0) {
        //     return thunkAPI.rejectedWithValue('Пиццы пустые');
        // }
        //
        // return thunkAPI.fulfillWithValue(data);
    }
);

const initialState: PizzaSliceStateType = {
    items: [],
    status: Status.LOADING,  //loading | success | error
};

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<PizzaType[]>) => {
            state.items = action.payload;
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
},);

export const selectorPizzasData = (state: RootState) => state.pizzas;

export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;