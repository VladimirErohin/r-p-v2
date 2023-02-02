import React, {useEffect, useState} from 'react';
import Category from "../components/Category";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";

const Home = () => {

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({name:'популярности', sortProperty: "rating"});

    useEffect(() => {
        setIsLoading(true)
        //fetch('https://63d2e6911780fd6ab9cf1692.mockapi.io/items')

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://63d2e6911780fd6ab9cf1692.mockapi.io/items?${
            category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            })
        window.scroll(0, 0)
    }, [categoryId, sortType])

    console.log('PIZZAS - ', pizzas)
    console.log('sortType - ', sortType)
    console.log('categoryId - ', categoryId)

    return (
        <>
            <div className="content__top">
                <Category value={categoryId} onChangeCategory={(i)=> setCategoryId(i)}/>
                <Sort value={sortType} onChangeType={ (t)=>setSortType(t)}/>
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