import {CSSTransition} from 'react-transition-group';
import React from "react";
import "../../assets/CSSTransitions.sass";

export default function AnimatedPage(Page) {

    return props =>
        <div className="page">
            <CSSTransition
                in={true}
                appear={true}
                timeout={400}
                classNames={"slide"}
            >
                <Page {...props} />
            </CSSTransition>
        </div>;
}