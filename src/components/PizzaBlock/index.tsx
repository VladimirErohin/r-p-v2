import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../redux/slices/cart/slice";
import {Link} from "react-router-dom";
import {selectorCartItemById} from "../../redux/slices/cart/selectors";
import {CartItemType} from "../../redux/slices/cart/types";

export type PizzaBlockTypeProps = {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    sizes: Array<number>,
    types: number[],
};

const typeNames: Array<string> = ['тонкое', 'традиционное'];

const PizzaBlock: React.FC<PizzaBlockTypeProps> = ({id, name, price, imageUrl, sizes, types}) => {

    const cartItem = useSelector(selectorCartItemById(id))

    const [activeSize, setActiveSize] = useState<number>(0);
    const [activeType, setActiveType] = useState<number>(0);
    const dispatch = useDispatch();

    const addedItem = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        let item: CartItemType = {
            id,
            name,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
            count: 0,
        }
        dispatch(addProduct(item));
    }

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{name}</h4>
                </Link>
                <div className="pizza-block__selector">
                    <ul>
                        {types?.map(type => <li
                            key={type + 1}
                            onClick={() => setActiveType(type)}
                            className={activeType === type ? "active" : ""}>{typeNames[type]}
                        </li>)}
                    </ul>
                    <ul>
                        {sizes?.map((size, index) =>
                            <li
                                key={index + 1}
                                onClick={() => setActiveSize(index)}
                                className={activeSize === index ? "active" : ""}>
                                {size} см.
                            </li>)}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div className="button button--outline button--add" onClick={onClickAdd}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedItem > 0 && <i>{addedItem}</i>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;