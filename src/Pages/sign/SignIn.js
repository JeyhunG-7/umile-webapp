import React, { useState } from 'react';
import './Sign.css';
import SignInComponent from './Components/SignIn';
import ForgotPass from './Components/ForgotPass';
import Fade from 'react-reveal/Fade';
import LogoTransperent from '../../Images/logo_transparent.png';


export default function SignIn(props) {
    const [showForgotPass, setShowForgotPass] = useState(false);

    function handleShowForgotPass() {
        setShowForgotPass(true);
    }

    function handleHideForgotPass() {
        setShowForgotPass(false);
    }

    return (
        <div id="main" className="main sign-in-page">
            <div className="div-logo">
                <img alt="logo" src={LogoTransperent} />
            </div>
            <div className="bg-square"></div>
            <Fade>
                {
                    showForgotPass
                        ? <ForgotPass handleHideForgotPass={handleHideForgotPass} />
                        : <SignInComponent handleShowForgotPass={handleShowForgotPass} />
                }
            </Fade>
        </div>
    );
}