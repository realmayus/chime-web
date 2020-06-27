import React from "react";
import styles from "./StyledLink.module.sass";

export default function StyledLink({link, text, showArrow}) {
    return(
        <div className={styles.wrapper}>
            { showArrow &&
                <span>-&gt;</span>
            }
            <a className={styles.link} href={link}>{text}</a>
        </div>
    )
}