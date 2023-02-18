import {RootState} from "../../store";

export const selectorCart = (state: RootState) => state.cartSlice;
export const selectorCartItemById = (id: string) =>( state: RootState)=>
    state.cartSlice.items.find((obj) => obj.id === id);