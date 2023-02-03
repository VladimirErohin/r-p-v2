import React from "react";

function Category({value, onChangeCategory}) {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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

export default Category;