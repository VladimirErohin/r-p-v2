import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";


export enum SortPropertyEnum {
    RATING_DESK = 'rating',
    RATING_ASK = '-rating',
    PRICE_DESK = 'price',
    PRICE_ASK = '-price',
    CATEGORY_DESC = 'category',
    CATEGORY_ASC = '-category',
}

export type SortType = {
    name: string;
    sortProperty: SortPropertyEnum;
}

export interface FilterSliceStateType {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: SortType;
}

const initialState: FilterSliceStateType = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESK
    }
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },

        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },

        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload
        },

        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterSliceStateType>) => {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: SortPropertyEnum.RATING_DESK,
                };
            }
            // state.currentPage = Number(action.payload.currentPage);
            // state.sort.sortProperty = action.payload.sort.sortProperty;
            // state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const selectorSort = (state: RootState) => state.filterSlice.sort;
export const selectorFilter = (state: RootState) => state.filterSlice;

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer