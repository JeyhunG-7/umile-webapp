import React from 'react';
import './Components.css';


export default function Footer(props) {

    return (
        <>
            <nav className="footer">
                <div className="ftr-body">
                    <div className="copywrite">
                        <i className="far fa-copyright"></i> 2020<span>&#169;</span> umile.xyz
                        </div>
                    <div className="body-sub-2">
                        <a href="/privacy" className="page-link">Privacy</a>
                        <a href="/terms" className="page-link">Terms</a>
                    </div>
                </div>
            </nav>
        </>
    );
}