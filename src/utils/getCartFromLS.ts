import calcTotalPrice from "./calcTotalPrice";
import {CartItemType} from "../redux/slices/cart/types";

const GetCartFromLs = () => {
    const data = localStorage.getItem('cart')
    const items  = data ? JSON.parse(data)  : [];
    const totalPrice = calcTotalPrice(items)

    return{
        items: items as CartItemType[],
        totalPrice:totalPrice,
    }
};

export default GetCartFromLs;