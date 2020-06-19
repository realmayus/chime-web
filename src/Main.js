import React, {Suspense, useEffect} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import Home from "./pages/Home"
import {CLIENT_ID, FRONTEND_URL, INVITE_URL} from "./constants"
import Callback from "./pages/Callback"
import Dashboard from "./pages/Dashboard"
import Features from "./pages/Features";

export default function Main() {
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
                        window.location.href = "https://discord.com/api/oauth2/authorize?response_type=token&client_id=" + CLIENT_ID + "&scope=identify&redirect_uri=" + encodeURIComponent(FRONTEND_URL + "/oauth/callback")
                        return null
                    }}/>
                    <Route exact path="/oauth/callback" component={Callback}/>
                    <Route exact path="/invite" component={() => {
                        window.location.href = INVITE_URL
                        return null
                    }}/>

                    <Redirect to={'https://http.cat/404'}/>
                </Switch>
            </Suspense>
        </main>
    )
}