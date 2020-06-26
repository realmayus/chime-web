import React, {useEffect, useState} from "react"
import styles from "./Navbar.module.sass"
import Logo from "../../assets/chime_logo_full.svg"
import {Link, withRouter} from "react-router-dom"
import {INVITE_URL} from "../../constants"
import {connect} from "react-redux"
import AvatarPopup from "../Minor/AvatarPopup";

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        avatarURL: state.avatarURL
    }
}



export default withRouter(connect(mapStateToProps)(function Navbar(props) {
    const [avatarURL, setAvatarURL] = useState(null);

    useEffect(() => {
        setAvatarURL(props.avatarURL)
    }, [props.avatarURL])

    const isOnDashboard = () => {
        return props.location.pathname.startsWith("/app")
    }
    const getCurrentPage = () => {
        if(props.location.pathname === "/") {
            return "home"
        } else if(props.location.pathname === "/features") {
            return "features"
        }
    }
    return (
        <div className={styles.bar}>
            <Link to={"/"} className={styles.logoLink}><img draggable="false" className={styles.logo} src={Logo} alt="Chime"/></Link>
            { !isOnDashboard()
                ? <div className={styles.rightWrapper}>
                    <a href={INVITE_URL} className={styles.highlighted + " " + styles.navbarLink}>Invite</a>
                    <Link to={"/"} className={styles.navbarLink + (getCurrentPage() === "home" ? " " + styles.selected : "")}>Home</Link>
                    <Link to={"/features"} className={styles.navbarLink + (getCurrentPage() === "features" ? " " + styles.selected : "")}>Features</Link>
                    <a className={styles.navbarLink} href="https://patreon.com/realmayus">Donate</a>
                    {props.isLoggedIn
                        ? <Link to="/app" className={styles.navbarLink}>App</Link>
                        : <Link to="/oauth/login" className={styles.navbarLink}>Sign In</Link>
                    }
                    {props.isLoggedIn && props.avatarURL != null &&
                        <AvatarPopup img={avatarURL} className={styles.avatar}/>
                    }
                </div>
                : <div className={styles.rightWrapper}>
                    <a href={INVITE_URL} className={styles.navbarLink}>Invite</a>
                    <a className={styles.navbarLink} href="https://patreon.com/realmayus">Donate</a>
                    <Link to="/" className={styles.navbarLink}>Home</Link>
                    {props.isLoggedIn && props.avatarURL != null &&
                        <AvatarPopup img={avatarURL} className={styles.avatar}/>
                    }
                </div>
            }
        </div>
    )
}))