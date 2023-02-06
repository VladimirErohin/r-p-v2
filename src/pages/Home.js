import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import qs from 'qs';
import {useNavigate} from 'react-router-dom';
import Category from "../components/Category";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters} from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const {categoryId, sort, currentPage} = useSelector((state) => state.filterSlice)
    const dispatch = useDispatch();
    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const onClickCategory = useCallback((id) => {
        dispatch(setCategoryId(id))
    },[])

    const fetchPizzas = () => {
        setIsLoading(true)

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(`https://63d2e6911780fd6ab9cf1692.mockapi.io/items?${category}${search}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}`)
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            })
    }

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage])

    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({
                    ...params,
                    sort
                }
            ))
            isSearch.current = true;
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scroll(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((pizza) => <Index {...pizza} key={pizza.id}/>);
    const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);

    console.log('PIZZAS - ', items)

    return (
        <>
            <div className="content__top">
                <Category value={categoryId} onChangeCategory={(i) => onClickCategory(i)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeleton
                    : pizzas
                }
            </div>
            <Pagination/>
        </>
    );
};

export default Home;