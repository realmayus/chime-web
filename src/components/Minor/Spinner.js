import React from "react"
import styles from "./Spinner.module.sass"

export function SpinnerSmall({color="black", className=""}) {
    return (
        <div className={(color === "black" ? styles.loaderSmallDark : styles.loaderSmall) + " " + className}></div>
    )
}

export function SpinnerMedium() {
    return (
        <div className={styles.loaderMedium}></div>
    )
}

export function SpinnerBig({color="white"}) {
    return (
        <div className={(color === "white" ? styles.loaderBig : styles.loaderBigDark)}></div>
    )
}