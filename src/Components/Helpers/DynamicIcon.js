import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as contactUs from "../../Lottie/contact-us.json";
import * as introMain from "../../Lottie/main-intro.json";

export default function DynamicIcon(props) {

    var iconList = {
        contactUs: {
            loop: true,
            autoplay: true,
            animationData: contactUs.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        },
        introMain: {
            loop: true,
            autoplay: true,
            animationData: introMain.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }
    };

    return (
        !props.type
            ?
            ''
            :
            <FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                    <Lottie options={iconList[props.type]} height={parseInt(props.height)} width={parseInt(props.width)} />
                </div>
            </FadeIn>
    );
}