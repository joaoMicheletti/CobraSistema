import React from 'react';
import './home.css';
import Logo from '../../image/cobraLogo.jpeg';
import HeaderComponent from "../componentes/header/header.js";
export default function Home(){
    return(
        <div className='homeCorpo'>
            <HeaderComponent/>
            <div className='homeCenter'>
                <img className='homeCenterImg' src={Logo} alt='logo'/>
                <p>welcome  to your workspace</p>
            </div>
        </div>
    );
};