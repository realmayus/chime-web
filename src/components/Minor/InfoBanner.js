import React from "react";
import styles from "./InfoBanner.module.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";


export default function InfoBanner({text, callbackOK}) {
    return(
        <div className={styles.banner}>
            <div className={styles.text}>{text}</div>
            <FontAwesomeIcon className={styles.icon} icon={faTimes} onClick={callbackOK}/>
        </div>
    )
}