import React, { useRef, useState } from 'react';
import './ContactUs.css';
import Fade from 'react-reveal/Fade';
import Validate from 'validate.js';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';

import Icon from '../../../Images/main-contact-us.png';

const ContactUs = React.forwardRef((props, ref) => {
    const name = useRef(null);
    const email = useRef(null);
    const message = useRef(null);

    const [loading, setLoading] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [doneSubmition, setDoneSubmition] = useState(false);
    const [errorSubmition, setErrorSubmition] = useState(false);

    const [currentCount, setCount] = useState(0);
    const [stateObj, setMessage] = useState({
        nameMessage: null,
        emailMessage: null,
        messageMessage: null
    });

    const constraints = {
        name: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[a-zA-Z ]+"
                // pattern: /[A-Za-z0-9 '’.,():;+-?!#]+/
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
        message: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[a-zA-Z ]+"
            }
        }
    };

    async function sendMessage() {
        setLoading(true);

        let check = Validate({
            name: name.current.value,
            email: email.current.value,
            message: message.current.value
        }, constraints);

        check && setMessage(prevState => {
            return {
                ...prevState,
                nameMessage: check.name ? (check.name.length > 1 ? "Required!" : "Enter valid first name") : null,
                emailMessage: check.email ? (check.email.length > 1 ? "Required!" : "Enter valid email") : null,
                messageMessage: check.message ? (check.message.length > 1 ? "Required!" : "Enter valid message") : null
            }
        });

        if (!check) {
            try {
                var rawData = await fetch('http://localhost:8080/api/contact/getintouch', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        name: name.current.value,
                        message: message.current.value
                    })
                });
                var response = await rawData.json();
                if (response.success) {
                    setLoading(false);
                    setDoneLoading(true);
                    setTimeout(function () {
                        setDoneLoading(false);
                        setDoneSubmition(true);
                    }, 1300);
                } else {
                    setLoading(false);
                    setErrorSubmition(true);
                }
            } catch (e) {
                console.error(e);
                console.log('Something went wrong while login in. Please try again later');
            }
        } else {
            setLoading(false);
        }
    }

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            sendMessage();
        } else {
            setMessage({
                ...stateObj,
                nameMessage: null,
                emailMessage: null,
                messageMessage: null
            });
        }

        // need to wrap inside setTimeout to get next tick
        setTimeout(() => {
            setCount(message.current.value.length);
        }, 0);
    }

    function addAutoResize() {
        document.querySelectorAll('[data-autoresize]').forEach(function (element) {
            element.style.boxSizing = 'border-box';
            var offset = element.offsetHeight - element.clientHeight;
            element.addEventListener('input', function (event) {
                event.target.style.height = 'auto';
                event.target.style.height = event.target.scrollHeight + offset + 'px';
            });
            element.removeAttribute('data-autoresize');
        });
    }

    addAutoResize();

    function _renderSubmitButton() {
        if (doneSubmition) {
            return (
                <div className="div-lottie-submit">
                    Thank you for the interest! UMile team member will contact you within 24 hours.
                </div>
            );
        } else if (doneLoading) {
            return (
                <div className="div-lottie-submit">
                    <DynamicIcon type="doneLoading" width={40} height={40} />
                </div>
            );
        } else if (errorSubmition) {
            return (
                <div className="div-lottie-submit">
                    Ups..Something went wrong. Please refresh the page and try again.
                </div>
            );
        } else if (loading) {
            return (
                <div className="div-lottie-submit">
                    <DynamicIcon type="loading" width={34} height={34} />
                </div>
            );
        } else {
            return (
                <button className="send-message" onClick={sendMessage}>
                    <i className='far fa-paper-plane'></i>
                    <span>Send</span>
                </button>
            );
        }
    }

    return (
        <>
            <Fade>
                <div id="contact-us" className="sec-contact-us">
                    <div className="div-contact-us" ref={ref}>
                        <h3>Let's get in touch!</h3>
                        <img alt='Icon' src={Icon} />
                        <p>Contact our team to discuss solutions that fit the needs of your business.</p>
                        <div className="div-name-email">
                            <div className={(!stateObj.nameMessage ? 'user-input name' : 'user-input name error')}>
                                <i className="lni lni-user user-icon"></i>
                                <input name="name"
                                    ref={name}
                                    type="text"
                                    placeholder="Tim Cook"
                                    onKeyPress={handleOnKeyPress} />
                                <span className="helper-txt">{stateObj.nameMessage}</span>
                            </div>
                            <div className={(!stateObj.emailMessage ? 'user-input' : 'user-input error')}>
                                <i className="lni lni-envelope email-icon"></i>
                                <input name="email"
                                    ref={email}
                                    type="email"
                                    placeholder="TCook@address.com"
                                    onKeyPress={handleOnKeyPress} />
                                <span className="helper-txt">{stateObj.emailMessage}</span>
                            </div>
                        </div>
                        <div className={(!stateObj.messageMessage ? 'div-message' : 'div-message error')}>
                            <i className="far fa-comment-dots"></i>
                            <textarea data-autoresize
                                className="textarea"
                                maxLength="160"
                                rows="1"
                                placeholder="Message"
                                ref={message}
                                onPaste={handleOnKeyPress}
                                onKeyDown={handleOnKeyPress}></textarea>
                            {/* <span className="helper-txt">{stateObj.messageMessage}</span> */}
                            <div className="count">{160 - currentCount}</div>
                        </div>
                        {_renderSubmitButton()}
                    </div>
                </div>
            </Fade>
        </>
    );
});

export default ContactUs;