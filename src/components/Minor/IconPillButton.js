import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import styles from "./IconPillButton.module.sass"
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons/faCircleNotch"
import {SpinnerSmall} from "./Spinner"

export default function IconPillButton(props) {
    return(
        <button disabled={props.loading || props.disabled} className={styles.pillbutton + (props.inverted ? " " + styles.inverted : "")} onClick={props.onclick}>

            { props.loading
               ? <div className={styles.innerDiv}>
                    <SpinnerSmall className={styles.spinner} color={props.inverted ? 'black' : 'white'}/>
                    <span className={styles.text + (props.inverted ? " " + styles.inverted : "") + " " + styles.spinnerText}>{props.text}</span>
                </div>
               : <div className={styles.innerDiv}>
                    <FontAwesomeIcon className={styles.icon + (props.inverted ? " " + styles.inverted : "")} size={"20px"} icon={props.icon}/>
                    <span className={styles.text + (props.inverted ? " " + styles.inverted : "")}>{props.text}</span>
                </div>
            }        </button>
    )
}