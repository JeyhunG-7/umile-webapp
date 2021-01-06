import React, { useRef, useState } from 'react';
import '../Main.css';
import DynamicIcon from '../../../Components/Helpers/DynamicIcon';
import Fade from 'react-reveal/Fade';

export default function ContactUs(props) {
    const name = useRef(null);
    const email = useRef(null);

    const [stateObj, setMessage] = useState({
        nameMessage: null,
        emailMessage: null
    });

    function sendMessage(){
        console.log("getdi");
    }

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            sendMessage();
        } else {
            setMessage({
                ...stateObj,
                nameMessage: null,
                emailMessage: null
            });
        }
    }

    return (
        <>
            <Fade>
                <section id="contact-us" className="sec-contact-us">
                    <div className="div-contact-us">
                        <h3>Get in Touch</h3>
                        <DynamicIcon type="contactUs" width='300' height='300' />
                        <p>Contact our team to discuss solutions that fit the needs of your business.</p>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
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
                    </div>
                </section>
            </Fade>
        </>
    );
}