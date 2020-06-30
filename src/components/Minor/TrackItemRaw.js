import React from "react";
import styles from "./TrackItem.module.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {getPrettyTimeDelta} from "../../util";

export default function TrackItemRaw(props) {
    return(
        <div className={styles.wrapper}>
            <span className={styles.title}>{props.title}</span>
            <span className={styles.artist}>{props.artist}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.duration}>{getPrettyTimeDelta(props.duration)}</span>
            <FontAwesomeIcon className={styles.icon} icon={faLink} onClick={() => window.location.href = props.url}/>
        </div>

    )
}