import React from "react"
import styles from "./Navbar.module.sass"
import Logo from "../../assets/chime_logo_full.svg"
import {Link, withRouter} from "react-router-dom"
import {INVITE_URL} from "../../constants"
import {connect} from "react-redux"

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps)(function Navbar(props) {
    const isOnDashboard = () => {
        return props.location.pathname.startsWith("/app")
    }
    return (
        <div className={styles.bar}>
            <Link to={"/"} className={styles.logoLink}><img draggable="false" className={styles.logo} src={Logo} alt="Chime"/></Link>
            { !isOnDashboard()
                ? <div>
                    <a href={INVITE_URL} className={styles.highlighted + " " + styles.navbarLink}>Invite</a>
                    <Link to={"/features"} className={styles.navbarLink}>Features</Link>
                    <a className={styles.navbarLink} href="https://patreon.com/realmayus">Donate</a>
                    {props.isLoggedIn
                        ? <Link to="/app" className={styles.navbarLink}>App</Link>
                        : <Link to="/oauth/login" className={styles.navbarLink}>Sign In</Link>
                    }
                </div>
                : <div>
                    <a href={INVITE_URL} className={styles.navbarLink}>Invite</a>
                    <a className={styles.navbarLink} href="https://google.com">Donate</a>
                    <Link to="/" className={styles.navbarLink}>Back</Link>
                </div>
            }
        </div>
    )
}))