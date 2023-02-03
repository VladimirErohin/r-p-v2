import React, {useContext, useEffect, useState} from 'react';
import Category from "../components/Category";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

const Home = () => {

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({name: 'популярности', sortProperty: "rating"});
    const [currentPage, setCurrentPage] = useState(1);

    // const pizzas = items.filter(obj => {
    //     if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true
    //     }
    //     return false
    // }).map((pizza) => <Index {...pizza} key={pizza.id}/>);

    const pizzas = items.map((pizza) => <Index {...pizza} key={pizza.id}/>);

    const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);

    useEffect(() => {
        setIsLoading(true)
        //fetch('https://63d2e6911780fd6ab9cf1692.mockapi.io/items')

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://63d2e6911780fd6ab9cf1692.mockapi.io/items?${category}${search}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            })
        window.scroll(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    console.log('PIZZAS - ', items)

    return (
        <>
            <div className="content__top">
                <Category value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onChangeType={(t) => setSortType(t)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeleton
                    : pizzas
                }
            </div>
            <Pagination onChangePage = {(number)=>setCurrentPage((number))}/>
        </>
    );
};

export default Home;