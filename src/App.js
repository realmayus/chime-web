import React, {useEffect} from "react"
import Navbar from "./components/Navbar/Navbar"
import Main from "./Main"
import {connect} from "react-redux";
import {useLocalStorage} from "./util";
import {setAvatarURL, setData, setDiscordID, setLoggedIn, setUsername} from "./redux/actions";
import {BACKEND_URL} from "./constants";
import {Link, useLocation} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import InfoBanner from "./components/Minor/InfoBanner";
import AnimatedComp from "./components/Minor/AnimatedComp";
import {version as tosVersion} from "./pages/TermsOfService";
import {version as privacyVersion} from "./pages/PrivacyPolicy";

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        doneLoggingIn: state.doneLoggingIn
    }
}

export default connect(mapStateToProps)(function App(props) {
    const [discordToken, ] = useLocalStorage('discordToken', null);
    const [hideBanner, setHideBanner] = useLocalStorage('TosPrivacyBanner', false);
    const [tosVersionSaved, setTosVersion] = useLocalStorage('tosVersion', false);
    const [privacyVersionSaved, setPrivacyVersion] = useLocalStorage('privacyVersion', false);
    const location = useLocation();

    useEffect(() => {
        if(discordToken !== "null" && discordToken != null) {
            props.dispatch(setLoggedIn(true))
            // props.dispatch(setAccessToken(discordToken))
            fetch(BACKEND_URL + "/getProfile?token=" + discordToken).then(res => res.json()).then(res => {
                props.dispatch(setAvatarURL(res.avatar_url))
                props.dispatch(setUsername(res.user_name))
                props.dispatch(setDiscordID(res.user_id))
                props.dispatch(setData(res.data))
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [discordToken, props.doneLoggingIn])
    return(
        <div >
            { !hideBanner &&
                <AnimatedComp><InfoBanner
                text={<span>By using this web app, you agree to the <Link style={{color: "#585858"}} to='/terms'>Terms of Service</Link> and our <Link
                    style={{color: "#585858"}} to={"/privacy"}>Privacy Policy</Link>.</span>}
                callbackOK={() => {
                    setHideBanner(true);
                    setTosVersion(tosVersion);
                    setPrivacyVersion(privacyVersion);
                }}/></AnimatedComp>
            }

            { hideBanner && tosVersionSaved !== tosVersion &&
                <AnimatedComp><InfoBanner
                    text={<span>Chime updated its Terms of Service! Read them <Link style={{color: "#585858"}} to='/terms'>here</Link>.</span>}
                    callbackOK={() => {
                        setHideBanner(true);
                        setTosVersion(tosVersion);
                }}/></AnimatedComp>
            }

            { hideBanner && privacyVersionSaved !== privacyVersion &&
                <AnimatedComp><InfoBanner
                    text={<span>Chime updated its Privacy Policy! Read it <Link style={{color: "#585858"}} to='/privacy'>here</Link>.</span>}
                    callbackOK={() => {
                        setHideBanner(true);
                        setPrivacyVersion(privacyVersion);
                }}/>
                </AnimatedComp>
            }
            <Navbar/>
            <Main/>
            { location.pathname === "/" &&
                <Footer/>
            }
        </div>
    )
})