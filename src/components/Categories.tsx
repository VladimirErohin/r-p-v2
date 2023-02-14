import React from "react";

type CategoriesPropsType = {
    value:number,
    onChangeCategory: (i: number)=>void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesPropsType> = ({value, onChangeCategory}) =>{

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => <li
                    onClick={()=>onChangeCategory(index)}
                    className={value === index ? "active" : ''}
                    key={index + 1}
                >{categoryName}</li>)}
            </ul>
        </div>
    )
}

export default Categories;