import React, {useEffect, useState} from 'react';
import Category from "../components/Category";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";

const Home = () => {

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://63d2e6911780fd6ab9cf1692.mockapi.io/items')
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            })

    }, [])

    console.log('PIZZAS - ', pizzas)

    return (
        <>
        <div className="content__top">
            <Category/>
            <Sort/>
        </div>
    <h2 className="content__title">Все пиццы</h2>
    <div className="content__items">
        {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
            : pizzas.map((pizza) =>
                <Index {...pizza}
                       key={pizza.id}
                />
            )}
    </div>
        </>
);
};

export default Home;