import React from 'react';
import './Pricing.css';
import Fade from 'react-reveal/Fade';

const Pricing = React.forwardRef((props, ref) => {

    return (
        <>
            <Fade>
                <section className="sec-pricing">
                    <div ref={ref} style={{height: '100%'}}>
                        <h3>Simple and transparent pricing</h3>
                        <p className="header-desc">UMile provides next day delivery services within Calgary city limits</p>
                        <div className="body-pricing">
                            <div className="col-bd cob-1">
                                <div className="container-bd cbd-1">
                                    <div className="ln-2">1-3 orders</div>
                                    <div className="ln-3"><span>C$</span>9.99/order</div>
                                    <p className="ln-4">C$9.99 per delivery is applicable for orders that contain 1, 2, or 3 deliveries submitted for the same day.</p>
                                </div>
                            </div>
                            <div className="col-bd cob-2">
                                <div className="container-bd cbd-2">
                                    <div className="ln-2">4-6 orders</div>
                                    <div className="ln-3"><span>C$</span>7.99/order</div>
                                    <p className="ln-4">C$7.99 per delivery is applicable for orders that contain 4, 5, or 6 deliveries submitted for the same day.</p>
                                </div>
                            </div>
                            <div className="col-bd cob-3">
                                <div className="container-bd cbd-3">
                                    <div className="ln-2">7 or more orders</div>
                                    <div className="ln-3"><span>C$</span>7.49/order</div>
                                    <p className="ln-4">C$7.49 per delivery is applicable for orders that contain 7 or more deliveries submitted for the same day.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fade>
        </>
    );
});

export default Pricing;