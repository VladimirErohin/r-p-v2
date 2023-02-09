import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'users/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const {order, sortBy, category, search, currentPage} = params;
        // const response = await userAPI.fetchById(userId)
        // return response.data
        const {data} = await axios.get(`https://63d2e6911780fd6ab9cf1692.mockapi.io/items?${category}${search}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}`)
        return data;

        // if (data.length === 0) {
        //     return thunkAPI.rejectedWithValue('Пиццы пустые');
        // }
        //
        // return thunkAPI.fulfillWithValue(data);
    }
);

const initialState = {
    items: [],
    status: 'loading',  //loading | success | error
}

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = "loading";
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = "error";
            state.items = [];
        },
    },
},);

export const selectorPizzasData = (state) => state.pizzas;

export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;