import React from 'react';
import './Main.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Intro from './Components/Intro';

export default function Main(props) {
    return (
        <div id="main" className="main">
            <Header pageName={props.pageName}/>
            <Intro/>
            <Footer/>
        </div>
    );
}