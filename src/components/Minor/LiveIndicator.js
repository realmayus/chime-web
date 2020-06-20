import React from "react";
import styles from "./LiveIndicator.module.sass";

export default function LiveIndicator() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.indicator}></div>
            <span className={styles.text}>Live (1 min)</span>
        </div>
    )
}