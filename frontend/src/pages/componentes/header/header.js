import React from "react";
import './header.css'
export default function HeaderComponent(){
    return(
        <header className='homeHeader'>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href='/clientes'>Clientes</a></li>
                    <li><a href='/valinhos'>Valinhos</a></li>
                    <li><a href='/relatorios'>Relatórios</a></li>
                </ul>
            </nav>
        </header>
    );
};