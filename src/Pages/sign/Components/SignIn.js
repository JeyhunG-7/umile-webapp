import React, { useRef, useState } from 'react';
import '../Sign.css';
import Validate from 'validate.js';

export default function SignInComponent(props) {
    const email = useRef(null);
    const password = useRef(null);

    const [stateObj, setMessage] = useState({
        emailMessage: null,
        passMessage: null
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setProcessing] = useState(false);

    const constraints = {
        email: {
            email: {
                message: "Please enter valid email"
            }
        },
        password: {
            length: {
                minimum: 4
            }
        }
    };

    const submitSignIn = async e => {
        let check = Validate({
            email: email.current.value,
            password: password.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                emailMessage: check && check.email ? "Please enter valid email" : null,
                passMessage: check && check.password ? "Minimum 6 characters or more" : null,
            }
        });

        if (!check) {
            try{
                setProcessing(true);
                var rawData = await fetch('http://localhost:8080/api/clients/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: email.current.value,
                        password: password.current.value,
                    })
                });
                var response = await rawData.json();
                setProcessing(false);
                if (!response.success){
                    setErrorMessage(response.message);
                }
            } catch(e){
                console.log(e);
                setProcessing(false);
                // TODO: Show error
                return;
            }
        }
    }

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            submitSignIn();
        } else {
            setMessage({
                ...stateObj,
                emailMessage: null,
                passMessage: null,
                BEMessage: null
            });
        }
    }

    function handleShowForgotPass() {
        props.handleShowForgotPass();
    }

    return (
        <div className="sign-sec">
            <div className="sign-body">
                <div className="sign-header">Welcome back!</div>
                <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                    <label>Email</label>
                    <i className="lni lni-envelope email-icon"></i>
                    <input name="email"
                        ref={email}
                        type="email"
                        placeholder="Enter your email"
                        onKeyPress={handleOnKeyPress} />
                    <span className="helper-txt">{stateObj.emailMessage}</span>
                </div>

                <div className={(!stateObj.passMessage ? 'user-input password' : 'user-input error password')}>
                    <label>Password</label>
                    <i className="lni lni-lock-alt password-icon"></i>
                    <button className="btn-forgot-password" onClick={handleShowForgotPass}>Forgot Password?</button>
                    <input name="email"
                        ref={password}
                        type="password"
                        placeholder="Enter password"
                        onKeyPress={handleOnKeyPress} />
                    <span className="helper-txt">{stateObj.passMessage}</span>
                </div>
                <button className="btn-sign" onClick={submitSignIn}>{ isProcessing ? 'Loading...' : 'Sign In'}</button>
                <span className="error-txt">
                    {errorMessage}
                </span>
            </div>
        </div>
    );
}