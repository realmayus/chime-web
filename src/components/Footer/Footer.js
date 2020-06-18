import React from "react"
import styles from "./Footer.module.sass";

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <span>Legal</span>
            <span className={styles.dot}>•</span>
            <span>Privacy</span>
            <span className={styles.dot}>•</span>
            <span>GitHub</span>
        </footer>
    )
}