import React from 'react';
import './Components.css';


export default function Footer(props) {
    const screenX = window.screen.width;

    return (
        <>
            <nav className="footer">
                <div className="ftr-body">
                    <div className={screenX > 600 ? 'copywrite' : 'none'}>
                        <i className="far fa-copyright"></i> 2020<span>&#169;</span> umile.xyz
                        </div>
                    <div className="body-sub-2">
                        {/* <div className="lang">
                            <button className="btn-lang" onClick={handleShowLangList}>{props.userLang}</button>
                            <ul id="lang-list" className={showLangList ? 'lang-list' : 'none'}>
                                <li className="ll-li" onClick={() => handleChangeLang('az')}>Azerbaijani</li>
                                <li className="ll-li" onClick={() => handleChangeLang('en')}>English</li>
                                <li className="ll-li" onClick={() => handleChangeLang('ru')}>Russian</li>
                            </ul>
                        </div> */}
                        <a href="/privacy" className="page-link">Privacy</a>
                        <a href="/terms" className="page-link">Terms</a>
                    </div>
                </div>
            </nav>
        </>
    );
}