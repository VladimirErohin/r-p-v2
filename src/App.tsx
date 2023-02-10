import React from 'react';
import './scss/app.scss';
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayouts from "./layouts/MainLayouts";

function App() {

    return (
        <Routes>
            <Route path = '/' element={<MainLayouts/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/pizza/:id' element={<FullPizza/>}/>
                <Route path='*' element={<NotFoundBlock/>}/>
            </Route>
        </Routes>
    );
}

export default App;
