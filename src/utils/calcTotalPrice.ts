import {CartItemType} from "../redux/slices/cartSlice";

const calcTotalPrice = (items: CartItemType []) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
    }, 0);
};

export default calcTotalPrice;