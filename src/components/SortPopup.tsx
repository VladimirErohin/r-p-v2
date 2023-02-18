import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {SortPropertyEnum, SortType} from "../redux/slices/filter/types";
import {setSort} from "../redux/slices/filter/slice";

type SortListType = {
    name: string,
    sortProperty: SortPropertyEnum,
};

type SortPopupPropsType = {
    value:SortType
}

export const sortList: SortListType[] = [
    {name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESK},
    {name: 'популярности (ASK)', sortProperty: SortPropertyEnum.RATING_ASK},
    {name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESK},
    {name: 'цене (ASK)', sortProperty: SortPropertyEnum.PRICE_ASK},
    {name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.CATEGORY_DESC},
    {name: 'алфавиту (ASK)', sortProperty: SortPropertyEnum.CATEGORY_ASC},
];

const  SortPopup: React.FC <SortPopupPropsType> = React.memo( ({value})=> {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const onClickListItem = (obj: SortListType) => {
        dispatch(setSort(obj))
        setOpen(!open)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as MouseEvent & {
                path: Node[]
            }
            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setOpen(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        }
    }, [])

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{value.name}</span>
            </div>
            {open && (<div className="sort__popup">
                <ul>
                    {sortList.map((obj, i) =>
                        <li
                            key={i}
                            className={value.sortProperty === obj.sortProperty ? "active" : ''}
                            onClick={() => onClickListItem(obj)}
                        >{obj.name}</li>
                    )}
                </ul>
            </div>)
            }
        </div>
    )
}
);

export default SortPopup;