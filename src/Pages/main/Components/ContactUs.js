import React, { useRef, useState} from 'react';
import '../Main.css';
import Fade from 'react-reveal/Fade';

import Icon from '../../../Images/main-contact-us.png';

const ContactUs = React.forwardRef((props, ref) => {
    const name = useRef(null);
    const email = useRef(null);
    const message = useRef(null);
    
    const [currentCount, setCount] = useState(0);
    const [stateObj, setMessage] = useState({
        nameMessage: null,
        emailMessage: null,
        messageMessage: null
    });

    async function sendMessage() {
        try{
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
            if (response.success){
                //TODO: Show success
                console.log('Success');
            } else {
                //TODO: Show error
                console.log('Error');
            }
        } catch(e){
            console.error(e);
            console.log('Something went wrong while login in. Please try again later');
        }
    }

    function handleOnKeyPress(e) {
        if (e && e.charCode === 13) {
            sendMessage();
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

    return (
        <>
            <Fade>
                <section id="contact-us" className="sec-contact-us">
                    <div className="div-contact-us" ref={ref}>
                        <h3>Let's get in touch!</h3>
                        <img alt='Icon' src={Icon} style={{height: '24%', width: 'auto', margin: '4% 0'}}/>
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

                        <div className="div-message">
                            <i className="far fa-comment-dots"></i>
                            <textarea data-autoresize
                                className="textarea"
                                maxLength="160"
                                rows="3"
                                placeholder="Message"
                                ref={message}
                                onPaste={handleOnKeyPress}
                                onKeyDown={handleOnKeyPress}></textarea>
                            <div id="the-count">
                                <span id="current">{currentCount}</span>
                                <span id="maximum">/ 160</span>
                            </div>
                        </div>
                        <button className="send-message" onClick={sendMessage}>
                            <i className='far fa-paper-plane'></i>
                            <span>Send</span>
                        </button>
                    </div>
                </section>
            </Fade>
        </>
    );
});

export default ContactUs;