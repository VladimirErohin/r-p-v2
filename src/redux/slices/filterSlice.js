import { createSlice } from '@reduxjs/toolkit';

// export interface filterState {
//     value: number
// }

// const initialState: filterState = {
//     value: 0,
// }

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort:{
        name: 'популярности',
        sortProperty: "rating"
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
         setCategoryId:(state,action)=>{
             state.categoryId = action.payload
         },

        setSort:(state, action)=>{
             state.sort = action.payload
        },

        setCurrentPage:(state, action)=>{
            state.currentPage = action.payload
        },
        setFilters:(state, action)=>{
            state.currentPage = Number(action.payload.currentPage);
            state.sort.sortProperty = action.payload.sort.sortProperty;
            state.categoryId = Number(action.payload.categoryId);
        },
        // increment: (state) => {
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        //},
    },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer