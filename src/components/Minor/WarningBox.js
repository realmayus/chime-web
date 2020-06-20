import React from "react";
import styles from "./WarningBox.module.sass"


export default function WarningBox(props) {
    return(
        <div className={styles.box}>
            {props.text}
        </div>
    )
}