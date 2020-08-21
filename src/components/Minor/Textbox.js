import React from "react";
import styles from "./Textbox.module.sass"

export default function Textbox(props) {

    return(
        <div>
            <input type="text" className={styles.textbox}/>
            <span className={styles.suffix}>{props.suffix}</span>
        </div>
    )
}