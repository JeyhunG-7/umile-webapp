import React, { useEffect, useRef, useState } from 'react';
import './Sign.css';
import Validate from 'validate.js';
import Fade from 'react-reveal/Fade';

export default function SignUp(props) {
    const fname = useRef(null);
    const lname = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const compName = useRef(null);
    const password = useRef(null);

    const params = props.match.params;

    const [isLoading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [stateObj, setMessage] = useState({
        fnameMessage: null,
        lnameMessage: null,
        emailMessage: null,
        phoneMessage: null,
        compNameMessage: null,
        passMessage: null
    });

    const constraints = {
        fname: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[a-zA-Z ]+"
            }
        },
        lname: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[a-zA-Z ]+"
            }
        },
        email: {
            presence: {
                allowEmpty: false
            },
            email: {
                message: "Please enter valid email"
            }
        },
        phone: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[0-9]+"
            }
        },
        compName: {
            format: {
                pattern: "[a-zA-Z ]*$"
            }
        },
        password: {
            presence: {
                allowEmpty: false
            },
            length: {
                minimum: 6
            }
        }
    };

    useEffect(async () => {
        if (!params.token){
            setLoading(false);
            setErrorMessage('Sign up is invitation only');
            return;
        }

        try{
            var rawData = await fetch('http://localhost:8080/api/clients/validate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: params.token})
            });
            var response = await rawData.json();
        } catch(e){
            return;
        }

        setLoading(false);
        if (!response.success){
            setErrorMessage('Invalid token');
        }
    }, []);

    const submitSignIn = async e => {
        let check = Validate({
            fname: fname.current.value,
            lname: lname.current.value,
            email: email.current.value,
            phone: phone.current.value,
            compName: compName.current.value,
            password: password.current.value
        }, constraints);

        check && setMessage(prevState => {
            return {
                ...prevState,
                fnameMessage: check.fname ? (check.fname.length > 1 ? "First name required!" : "Enter valid first name") : null,
                lnameMessage: check.lname ? (check.lname.length > 1 ? "Last name required!" : "Enter valid last name") : null,
                emailMessage: check.email ? (check.email.length > 1 ? "Email required!" : "Enter valid email") : null,
                phoneMessage: check.phone ? (check.phone.length > 1 ? "Phone number required!" : "Enter valid phone number") : null,
                compNameMessage: check.compName ? "Enter valid company name" : null,
                passMessage: check.password ? (check.password.length > 1 ? "Password required!" : "Minimum 6 characters or more") : null
            }
        });

        if (!check) {
            try{
                console.log("Send api call");
                var rawData = await fetch('http://localhost:8080/api/clients/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        first_name: fname.current.value,
                        last_name: lname.current.value,
                        phone: phone.current.value,
                        company_name: compName.current.value,
                        password: password.current.value,
                        token: params.token
                    })
                });
                var response = await rawData.json();
                console.log(response);
            } catch(e){
                console.log(e);
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
                fnameMessage: null,
                lnameMessage: null,
                emailMessage: null,
                phoneMessage: null,
                compNameMessage: null,
                passMessage: null
            });
        }
    }

    function renderLoadingUi(){
        return (
            <div className="sign-sec signup">
                <p>Loading...</p>
            </div>
        )
    }

    function renderErrorMessageUi(){
        return (
            <div className="sign-sec signup">
                <p>{errorMessage}</p>
            </div>
        )
    }

    function renderSignupUi(){
        return (
            <div className="sign-sec signup">
                <div className="sign-body">
                    <div className="sign-header">Let's Go!</div>
                    <div className="names">
                        <div className={(!stateObj.fnameMessage ? 'user-input fname' : 'user-input fname error')}>
                            <label>First Name</label>
                            <i className="lni lni-user user-icon"></i>
                            <input name="first name"
                                ref={fname}
                                type="text"
                                placeholder="Kenan"
                                onKeyPress={handleOnKeyPress} />
                            <span className="helper-txt">{stateObj.fnameMessage}</span>
                        </div>
                        <div className={(!stateObj.lnameMessage ? 'user-input lname' : 'user-input lname error')}>
                            <label>Last Name</label>
                            <i className="lni lni-user user-icon"></i>
                            <input name="email"
                                ref={lname}
                                type="text"
                                placeholder="Ron"
                                onKeyPress={handleOnKeyPress} />
                            <span className="helper-txt">{stateObj.lnameMessage}</span>
                        </div>
                    </div>

                    <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                        <label>Email</label>
                        <i className="lni lni-envelope email-icon"></i>
                        <input name="email"
                            ref={email}
                            type="email"
                            placeholder="example@address.com"
                            onKeyPress={handleOnKeyPress} />
                        <span className="helper-txt">{stateObj.emailMessage}</span>
                    </div>

                    <div className={(!stateObj.phoneMessage ? 'user-input' : 'user-input error')}>
                        <label>Phone Number</label>
                        <i className="lni lni-apartment company-icon"></i>
                        <input name="phone"
                            ref={phone}
                            type="text"
                            placeholder="(123) 456-78-90"
                            onKeyPress={handleOnKeyPress} />
                        <span className="helper-txt">{stateObj.phoneMessage}</span>
                    </div>

                    <div className={(!stateObj.compNameMessage ? 'user-input' : 'user-input error')}>
                        <label>Company Name</label>
                        <i className="lni lni-apartment company-icon"></i>
                        <input name="email"
                            ref={compName}
                            type="text"
                            placeholder="UMile"
                            onKeyPress={handleOnKeyPress} />
                        <span className="helper-txt">{stateObj.compNameMessage}</span>
                    </div>

                    <div className={(!stateObj.passMessage ? 'user-input password' : 'user-input error password')}>
                        <label>Password</label>
                        <i className="lni lni-lock-alt password-icon"></i>
                        <input name="password"
                            ref={password}
                            type="password"
                            placeholder="••••••"
                            onKeyPress={handleOnKeyPress} />
                        <span className="helper-txt">{stateObj.passMessage}</span>
                    </div>
                    <button className="btn-sign" onClick={submitSignIn}>Sign Up</button>
                </div>
            </div>
        )
    }

    var uiToRender;
    if (isLoading){
        uiToRender = renderLoadingUi();
    } else if (errorMessage !== ''){
        uiToRender = renderErrorMessageUi();
    } else {
        uiToRender = renderSignupUi();
    }

    return (
        <div id="main" className="main">
            <Fade>
                {uiToRender}
            </Fade>
        </div>
    )
}