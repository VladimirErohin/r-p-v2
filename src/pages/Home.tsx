import React, {useCallback, useEffect, useRef} from 'react';
import qs from 'qs';
import {Link, useNavigate} from 'react-router-dom';
import Category from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectorFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectorPizzasData} from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {

    const navigate = useNavigate();
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectorFilter);
    const {items, status} = useSelector(selectorPizzasData);
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, []);

    const onChangePage =(page:number)=>{
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // @ts-ignore
        dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage
        }))
    };

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
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
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((pizza:any) =>
        <Link to={`/pizza/${pizza.id}`} key={pizza.id}>
            <Index {...pizza}/>
        </Link>
    );
    const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);

    console.log('PIZZAS - ', items)

    return (
        <>
            <div className="container">
            <div className="content__top">
                <Category value={categoryId} onChangeCategory={(i:number) => onClickCategory(i)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (
                        <div className="content__error-info">
                            <h2>Произошла ошибка <span>😕</span></h2>
                            <p>
                                К сожалению не удалось получить пиццы.<br/>
                            </p>
                        </div>
                    )
                    : (
                        <div className="content__items">
                            {status === 'loading'
                                ? skeleton
                                : pizzas
                            }
                        </div>
                    )
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
                </div>
        </>
    );
};

export default Home;