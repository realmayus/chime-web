import styles from "./Category.module.sass";
import React from "react";

export default function Category(props) {
    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>{props.title}</p>
            <div>
                {props.children}
            </div>
        </div>
    );
}