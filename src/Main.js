import React, {Suspense, useEffect} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import Home from "./pages/Home"
import {CLIENT_ID, INVITE_URL} from "./constants"
import Callback from "./pages/Callback"
import Dashboard from "./pages/Dashboard"
import Features from "./pages/Features";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function Main(props) {
    useEffect(() => {
        window.title = "Chime"
    }, [])
    return(
        <main style={{height: "100%"}}>
            <Suspense fallback={<p>Loading…</p>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/features" component={Features}/>
                    <Route path="/app" component={Dashboard}/>
                    <Route exact path="/oauth/login" component={() => {
                        window.location.href = "https://discord.com/api/oauth2/authorize?response_type=token&client_id=" + CLIENT_ID + "&scope=identify&redirect_uri=" + encodeURIComponent(window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '') + "/oauth/callback")
                        return null
                    }}/>
                    <Route exact path="/oauth/callback" component={Callback}/>
                    <Route exact path="/invite" component={() => {
                        window.location.href = INVITE_URL
                        return null
                    }}/>
                    <Route exact path="/privacy" component={PrivacyPolicy}/>

                    <Route exact path="/404" component={() => {
                        return <div><h1>Wow, such empty</h1><p>404. There doesn't seem to be anything here.</p></div>
                    }}/>

                    <Redirect to={'/404'}/>
                </Switch>
            </Suspense>
        </main>
    )
}