import React, {Suspense} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import Home from "./pages/Home"
import {CLIENT_ID, INVITE_URL, SERVER_INVITE_URL} from "./constants"
import Callback from "./pages/Callback"
import Dashboard from "./pages/Dashboard"
import Features from "./pages/Features";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Stats from "./pages/Stats";
import AnimatedPage from "./components/Minor/AnimatedPage";
import {setAvatarURL, setData, setLoggedIn, setUsername} from "./redux/actions";
import {connect} from "react-redux";
import {useLocalStorage} from "./util";
import {useHistory} from "react-router-dom";
import TermsOfService from "./pages/TermsOfService";


export default connect() (function Main(props) {
    const [, setDiscordToken] = useLocalStorage('discordToken', null);
    const history = useHistory();

    return(
        <main>
            <Suspense fallback={<p>Loading…</p>}>
                <Switch>

                    {/*Static sites*/}
                    <Route exact path="/" component={AnimatedPage(Home)}/>
                    <Route exact path="/features" component={AnimatedPage(Features)}/>
                    <Route exact path="/stats" component={AnimatedPage(Stats)}/>

                    <Route exact path="/privacy" component={AnimatedPage(PrivacyPolicy)}/>
                    <Route exact path="/terms" component={AnimatedPage(TermsOfService)}/>


                    {/*Convenient Redirects*/}
                    <Route exact path="/invite" component={() => {
                        window.location.href = INVITE_URL
                        return null
                    }}/>
                    <Route exact path="/official-discord" component={() => {
                        window.location.href = SERVER_INVITE_URL
                        return null
                    }}/>


                    {/*OAuth*/}
                    <Route exact path="/oauth/login" component={() => {
                        window.location.href = "https://discord.com/api/oauth2/authorize?response_type=token&client_id=" + CLIENT_ID + "&scope=identify&redirect_uri=" + encodeURIComponent(window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '') + "/oauth/callback")
                        return null
                    }}/>
                    <Route exact path="/oauth/logout" component={() => {
                        setDiscordToken(null)
                        props.dispatch(setAvatarURL(null))
                        props.dispatch(setUsername(null))
                        props.dispatch(setData(null))
                        props.dispatch(setLoggedIn(false))
                        props.dispatch(setData(null))
                        history.push("/")
                        return null
                    }}/>
                    <Route exact path="/oauth/callback" component={Callback}/>



                    <Route path="/app" component={Dashboard}/>

                    <Route exact path="/404" component={() => {
                        return <div style={{textAlign: "center"}}><h1>Wow, such empty</h1><p>404. There doesn't seem to be anything here.</p></div>
                    }}/>

                    <Redirect to={'/404'}/>
                </Switch>
            </Suspense>

        </main>
    )
})