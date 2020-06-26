import React from "react"
import {connect} from "react-redux"
import DashboardContentPlaylist from "../components/DashboardContent/DashboardContentPlaylist"
import {Link, Route, Switch} from "react-router-dom"
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import DashboardPlaceholder from "../components/DashboardContent/DashboardPlaceholder"
import AnimatedPage from "../components/Minor/AnimatedPage";
import Sidebar from "../components/DashboardSidebar/Sidebar";

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(function Dashboard(props) {
    if(props.isLoggedIn) {
        return(
            <DndProvider backend={HTML5Backend}>
                <Sidebar/>
                <DashboardPlaceholder>
                    <div>
                        <Switch>
                            <Route exact path="/app" component={() => {
                                return <div/>
                            }}/>
                            <Route exact path="/app/p/:playlistID" component={AnimatedPage(DashboardContentPlaylist, '#323232')}/>
                            <Route exact path="/app/g/:guildID" component={() => {
                                return <div/>
                            }}/>
                        </Switch>
                    </div>
                </DashboardPlaceholder>
            </DndProvider>
        )
    } else {
        return(<div>Not logged in! <br/> <Link to={"/oauth/login"}>Log in</Link></div>)
    }
})