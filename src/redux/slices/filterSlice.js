import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchValue:'',
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

        setSearchValue:(state,action)=>{
            state.searchValue = action.payload
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
    },
})

export const selectorSort = (state)=>state.filterSlice.sort;
export const selectorFilter = (state) => state.filterSlice;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer