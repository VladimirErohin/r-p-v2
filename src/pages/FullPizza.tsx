import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const {id} = useParams();
    const[pizza, setPizza] = useState <{imageUrl:string; name: string; price: number}>();
    const navigate = useNavigate();

    useEffect(() => {
        async function getPizza() {
            try {
                const {data} = await axios.get(`https://63d2e6911780fd6ab9cf1692.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (error) {
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }

        getPizza()
    }, [])

    if(!pizza ){
        return <>"Loading ...."</>
    }

    return (
        <div >
            {pizza
                ?
                <div className="container">
                    <img src={pizza.imageUrl} alt=""/>
                    <h2>{pizza.name}</h2>
                    <h4>{pizza.price} ₽</h4>
                </div>
                : "Loading ...."
            }
        </div>
    );
};

export default FullPizza;