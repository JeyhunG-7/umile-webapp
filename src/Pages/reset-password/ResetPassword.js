import React, {  useRef, useState } from 'react';
import './ResetPassword.css';
import Validate from 'validate.js';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import DynamicIcon from '../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';

export default function ResetPassword(props) {
    const screenX = window.screen.width;

    const pass1 = useRef(null);
    const pass2 = useRef(null);

    const [stateObj, setMessage] = useState({
        pass1Message: null,
        pass2Message: null
    });

    const constraints = {
        pass1: {
            presence: {
                allowEmpty: false
            },
            length: {
                minimum: 6
            }
        },
        pass2: {
            presence: {
                allowEmpty: false
            },
            length: {
                minimum: 6
            }
        }
    };

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            handleRsetPassword();
        } else {
            setMessage({
                ...stateObj,
                pass1Message: null,
                pass2Message: null
            });
        }
    }

    function handleRsetPassword(){
        if(pass1.current.value !== pass2.current.value){
            setMessage(prevState => {
                return {
                    ...prevState,
                    pass2Message: "Passwords should match.."
                }
            });
            return;
        }

        let check = Validate({
            pass1: pass1.current.value,
            pass2: pass2.current.value
        }, constraints);

        check && setMessage(prevState => {
            return {
                ...prevState,
                pass1Message: check.pass1 ? (check.pass1.length > 1 ? "Password required!" : "Enter valid password") : null,
                pass2Message: check.pass2 ? (check.pass2.length > 1 ? "Repeat password required!" : "Enter valid password") : null
            }
        });

        //Call BE
    }

    return (
        <>
            <div className="main">
                <Header pageName={props.pageName} />
                <div className="body">
                    <div className="sec-reset-password">
                        <DynamicIcon type="resetPassword" width={screenX > 600 ? '225' : '300'} height={screenX > 600 ? '225' : '300'} />
                        <Fade>
                            <h2>Reset Password</h2>
                            <div className={(!stateObj.pass1Message ? 'user-input password' : 'user-input error password')}>
                                <label>Password</label>
                                <i className="lni lni-lock-alt password-icon"></i>
                                <input name="email"
                                    ref={pass1}
                                    type="password"
                                    placeholder="••••••"
                                    onKeyPress={handleOnKeyPress} />
                                <span className="helper-txt">{stateObj.pass1Message}</span>
                            </div>

                            <div className={(!stateObj.pass2Message ? 'user-input password' : 'user-input error password')}>
                                <label>Repeat Password</label>
                                <i className="lni lni-lock-alt password-icon"></i>
                                <input name="email"
                                    ref={pass2}
                                    type="password"
                                    placeholder="••••••"
                                    onKeyPress={handleOnKeyPress} />
                                <span className="helper-txt">{stateObj.pass2Message}</span>
                            </div>

                            <button className="btn-reset-pass" onClick={handleRsetPassword}>Submit</button>
                        </Fade>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}