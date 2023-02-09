import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
    const {id} = useParams();
    const[pizza, setPizza] = useState()

    async function getPizza() {

        try {
            const {data} = await axios.get(`https://63d2e6911780fd6ab9cf1692.mockapi.io/items/${id}`)
            setPizza(data)
        } catch (error) {
            alert('Ошибка при получении пиццы!')
        }
    }

    useEffect(() => {
        getPizza()
    }, [])

    if(!pizza){
        return "Loading ...."
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.name}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;