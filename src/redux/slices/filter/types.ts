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