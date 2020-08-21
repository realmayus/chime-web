import React, {useEffect, useState} from "react"
import styles from "./DashboardContent.module.sass"
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons"
import {useLocation} from "react-router-dom"
import {connect} from "react-redux"
import {SpinnerBig} from "../Minor/Spinner"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Category from "../Minor/Category";
import Textbox from "../Minor/Textbox";
import PlaybackViewer from "../Minor/PlaybackViewer";


const mapStateToProps = (state) => {
    return {
        data: state.data,
        isLoggedIn: state.isLoggedIn,
        // accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(function DashboardContentGuild(props) {
    const [currentlyLoading, setCurrentlyLoading] = useState(false)
    const [error, setError] = useState("")
    let location = useLocation()


    useEffect(() => {
        setCurrentlyLoading(false)
        setError("")
    }, [location])


    return(
        <div>
            <div>
                {error === ""
                    ? <div>
                        <div className={styles.titleWrapper}><span
                            className={styles.title}>chime lounge</span></div>
                        <div className={styles.actionContainer}>
                        </div>
                        {currentlyLoading &&
                        <div className={styles.spinnerWrapper}>
                            <SpinnerBig/>
                        </div>
                        }
                        <PlaybackViewer/>
                        <Category title="GENERAL">
                            <table className={styles.settingsTable}>
                                <tr>
                                    <td className={styles.settingsLabel}>Command Prefix</td>
                                    <td><Textbox/></td>
                                </tr>
                                <tr>
                                    <td className={styles.settingsLabel}>Default volume</td>
                                    <td><Textbox suffix="%"/></td>
                                </tr>
                            </table>
                        </Category>
                        <Category title="PERMISSIONS">
                            <p>Hey!</p>
                        </Category>

                    </div>
                    : <div className={styles.errorWrapper}>
                        <FontAwesomeIcon className={styles.errorIcon} icon={faExclamationTriangle}/>
                        <p className={styles.errorText}>An unknown error occurred. If this keeps happening, please ask for help on our support discord.</p>
                        <p className={styles.errorCode}>{error}</p>
                    </div>
                }

            </div>
        </div>

    )
})
