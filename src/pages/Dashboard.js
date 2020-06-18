import React, {Suspense, useCallback, useEffect} from "react"
import {connect} from "react-redux"
import Sidebar from "../components/DashboardSidebar/Sidebar"
import DashboardContentPlaylist from "../components/DashboardContent/DashboardContentPlaylist"
import {Route, Switch, useHistory} from "react-router-dom"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {BACKEND_URL} from "../constants"
import {setAvatarURL, setData, setUsername} from "../redux/actions"
import Home from "./Home"
import DashboardPlaceholder from "../components/DashboardContent/DashboardPlaceholder"

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(function Dashboard(props) {
    const history = useHistory()

    useEffect(() => {
        if(props.isLoggedIn) {
            fetch(BACKEND_URL + "/getProfile?token=" + props.accessToken).then(res => res.json()).then(res => {
                console.log(res)
                props.dispatch(setAvatarURL(res.avatar_url))
                props.dispatch(setUsername(res.user_name))
                props.dispatch(setData(res.data))
            })
        }
    }, [props, props.accessToken, props.isLoggedIn])

    if(props.isLoggedIn) {
        return(
            <DndProvider backend={HTML5Backend}>
                <div>
                    <Switch>
                        <Route exact path="/app" component={DashboardPlaceholder}/>
                        <Route exact path="/app/p/:playlistID" component={DashboardContentPlaylist}/>
                        <Route exact path="/app/g/:guildID" component={DashboardPlaceholder}/>
                    </Switch>
                </div>
            </DndProvider>
        )
    } else {
        history.push("/oauth/login")  //Redirect to OAuth login page if user isn't logged in!
        return(<div>Not logged in!</div>)
    }
})