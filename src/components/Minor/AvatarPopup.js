import React, {useRef, useState} from "react";
import styles from "./AvatarPopup.module.sass";
import "../../assets/CSSTransitions.sass";
import {Link} from "react-router-dom";
import {useOutsideAlerter} from "../../util";
import {CSSTransition} from "react-transition-group";


export default function AvatarPopup(props) {
    const [showPopup, setShowPopup] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setShowPopup(false));



    return (
        <div ref={wrapperRef} className={props.className != null ? props.className : ""}>
            <img className={styles.img} src={props.img} alt="Your Avatar" onClick={() => setShowPopup(!showPopup)}/>
            { showPopup &&
                <div className={styles.popupWrapper}>
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={400}
                    classNames={"slideDown"}
                >
                    <div className={styles.popup}>
                        <div className={styles.mainContent}>
                            <span className={styles.loggedInAs}>Logged in as:</span>
                            <span className={styles.username}>realmayus</span>
                        </div>
                        <Link className={styles.signOutLink} to={"/oauth/logout"}>Sign Out</Link>

                    </div>
                </CSSTransition>
            </div>}





        </div>
    )
}