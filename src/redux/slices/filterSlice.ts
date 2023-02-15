import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";

export type SortType={
    name: string;
    sortProperty: "rating" | "-rating" | "price" | "-price" | "category" | "-category";
}

export interface FilterSliceStateType{
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: SortType;
}

const initialState: FilterSliceStateType = {
    searchValue:'',
    categoryId: 0,
    currentPage: 1,
    sort:{
        name: 'популярности',
        sortProperty: "rating"
    }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
         setCategoryId:(state,action: PayloadAction<number>)=>{
             state.categoryId = action.payload
         },

        setSearchValue:(state,action: PayloadAction<string>)=>{
            state.searchValue = action.payload
        },

        setSort:(state, action: PayloadAction<SortType>)=>{
             state.sort = action.payload
        },

        setCurrentPage:(state, action: PayloadAction<number>)=>{
            state.currentPage = action.payload
        },
        setFilters:(state, action: PayloadAction<FilterSliceStateType>)=>{
            state.currentPage = Number(action.payload.currentPage);
            state.sort.sortProperty = action.payload.sort.sortProperty;
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const selectorSort = (state: RootState)=>state.filterSlice.sort;
export const selectorFilter = (state: RootState) => state.filterSlice;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer