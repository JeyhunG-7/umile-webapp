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

    const submitSignIn = e => {
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
            //BE call
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
                <button className="btn-sign" onClick={submitSignIn}>Sign In</button>
            </div>
        </div>
    );
}