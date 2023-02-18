export type CartItemType = {
    id: string;
    name: string;
    price: number;
    count:number;
    imageUrl: string;
    size: number;
    type: string;
}

export interface CartSliceState {
    totalPrice: number;
    items: CartItemType [];
}