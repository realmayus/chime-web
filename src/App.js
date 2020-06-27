import React, {useEffect} from "react"
import Navbar from "./components/Navbar/Navbar"
import Main from "./Main"
import {connect} from "react-redux";
import {useLocalStorage} from "./util";
import {setAvatarURL, setData, setLoggedIn, setUsername} from "./redux/actions";
import {BACKEND_URL} from "./constants";
import {useLocation} from "react-router-dom";
import Footer from "./components/Footer/Footer";
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        doneLoggingIn: state.doneLoggingIn
    }
}

export default connect(mapStateToProps)(function App(props) {
    const [discordToken, ] = useLocalStorage('discordToken', null);
    const location = useLocation();

    useEffect(() => {
        if(discordToken !== "null" && discordToken != null) {
            props.dispatch(setLoggedIn(true))
            // props.dispatch(setAccessToken(discordToken))
            fetch(BACKEND_URL + "/getProfile?token=" + discordToken).then(res => res.json()).then(res => {
                props.dispatch(setAvatarURL(res.avatar_url))
                props.dispatch(setUsername(res.user_name))
                props.dispatch(setData(res.data))
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [discordToken, props.doneLoggingIn])
    return(
        <div >
            <Navbar/>
            <Main/>
            { location.pathname === "/" &&
                <Footer/>
            }
        </div>
    )
})