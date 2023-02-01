import React, {useState} from "react";

function Category() {

    const [activeIndex, setActiveIndex] = useState(0);

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const onClickCategory = (index)=>{
        setActiveIndex(index)
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => <li
                    onClick={()=>onClickCategory(index)}
                    className={activeIndex === index ? "active" : ''}
                    key={index + 1}
                >{category}</li>)}
            </ul>
        </div>
    )
}

export default Category;