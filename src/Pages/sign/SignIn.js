import React, { useState } from 'react';
import './Sign.css';
import Header from '../../Components/Header';
import SignInComponent from './Components/SignIn';
import ForgotPass from './Components/ForgotPass';
import Fade from 'react-reveal/Fade';

export default function SignIn(props) {
    const [showForgotPass, setShowForgotPass] = useState(false);

    function handleShowForgotPass() {
        setShowForgotPass(true);
    }

    function handleHideForgotPass() {
        setShowForgotPass(false);
    }

    return (
        <div id="main" className="main">
            <Header pageName={props.pageName} />
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