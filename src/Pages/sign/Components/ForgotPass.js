import React, { useRef, useState } from 'react';
import '../Sign.css';
import Validate from 'validate.js';

export default function ForgotPass(props) {
    const email = useRef(null);

    const [stateObj, setMessage] = useState({
        emailMessage: null
    });

    const constraints = {
        email: {
            email: {
                message: "Please enter valid email"
            }
        }
    };

    const submitForgotPass = e => {
        let check = Validate({
            email: email.current.value
        }, constraints);

        setMessage(prevState => {
            return {
                ...prevState,
                emailMessage: check && check.email ? "Please enter valid email" : null
            }
        });

        if (!check) {
            //BE call
        }
    }

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            submitForgotPass();
        } else {
            setMessage({
                ...stateObj,
                emailMessage: null
            });
        }
    }

    function handleHideForgotPass() {
        props.handleHideForgotPass();
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
                <button className="btn-sign" onClick={submitForgotPass}>Send me the link</button>
                <button className="btn-back-to-signin" onClick={handleHideForgotPass}>or Sign In</button>
            </div>
        </div>
    );
}