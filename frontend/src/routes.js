import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login/login.js';
import Home from './pages/home/index.js';
import Cliente from './pages/clientes/clientes.js';
import Valinhos from './pages/valinhos/valinhos.js';
import Relatorios from './pages/relatorios/relatorios.js';
export default function Rotas(){
    return(
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/clientes' element={<Cliente/>}/>
                    <Route path='/valinhos' element={<Valinhos/>} />
                    <Route path='/relatorios' element={<Relatorios/>}/>
                </Routes>
            </Router>
        </>
    );
};