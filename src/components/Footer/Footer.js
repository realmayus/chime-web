import React from "react"
import styles from "./Footer.module.sass";
import {Link} from "react-router-dom";

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <Link to={"/privacy"} className={styles.footerLink}>Privacy</Link>
            <span className={styles.dot}>•</span>
            <a href="https://github.com/realmayus/chime-web" className={styles.footerLink} >GitHub</a>
        </footer>
    )
}