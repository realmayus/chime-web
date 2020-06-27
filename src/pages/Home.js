import React from "react"
import styles from "./Home.module.sass"
import {INVITE_URL, SERVER_INVITE_URL} from "../constants"
import {useHistory} from "react-router-dom";
import StyledLink from "../components/Minor/StyledLink";

export default function Home() {
    let history = useHistory()

    return(
        <div>
            <div className={styles.banner}>
                <div className={styles.bannerWrapper}>
                    <h1 className={styles.bannerHeading}>The only music bot you need</h1>
                    <div className={styles.buttonWrapper}>
                        <button onClick={() => {
                            history.push("/features")
                        }}>Features</button>
                        <button onClick={() => {
                            window.location = INVITE_URL
                        }}>Invite</button>
                    </div>
                </div>

            </div>
            <div className={styles.textWrapper}>
                <div>
                    <p>
                        <strong>Chime</strong> is a feature-rich and intuitive music bot for Discord. It sports the classic music bot features as well as <strong>private playlists</strong> which can be managed in a <strong>web interface</strong> which can also be used for configuring the bot’s options in your server.
                    </p>
                    <StyledLink link={SERVER_INVITE_URL} showArrow={true} text={"Join our discord server"}/>
                </div>
            </div>
        </div>
    )
}