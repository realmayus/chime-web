import React, {useRef, useState} from "react";
import styles from "./AvatarPopup.module.sass";
import "../../assets/CSSTransitions.sass";
import {Link} from "react-router-dom";
import {useOutsideAlerter} from "../../util";
import {CSSTransition} from "react-transition-group";
import {connect} from "react-redux";
import DefaultAvatar from "../../assets/default_avatar.png";

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(function AvatarPopup(props) {
    const [showPopup, setShowPopup] = useState(false);
    const wrapperRef = useRef(null);
    const avatar = useRef(null);
    useOutsideAlerter(wrapperRef, () => setShowPopup(false));



    return (
        <div ref={wrapperRef} className={props.className != null ? props.className : ""}>
            <img className={styles.img} src={props.img} alt="Your Avatar" ref={avatar} onError={() => avatar.current.src = DefaultAvatar} onClick={() => setShowPopup(!showPopup)}/>
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
                            <span className={styles.username}>{props.username}</span>
                        </div>
                        <Link className={styles.signOutLink} to={"/oauth/logout"}>Sign Out</Link>

                    </div>
                </CSSTransition>
            </div>}





        </div>
    )
})