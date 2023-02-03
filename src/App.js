import React, {createContext, useState} from 'react';
import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";

export const SearchContext = createContext('');

function App() {

    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='*' element={<NotFoundBlock/>}/>
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
