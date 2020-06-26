import React, {useEffect} from "react";
import queryString from 'query-string';
import {connect} from "react-redux";
import {setLoggedIn} from "../redux/actions";
import {useHistory, withRouter} from 'react-router-dom';
import {useLocalStorage} from "../util";


export default connect()(withRouter(function Callback(props) {
    const history = useHistory();
    const [discordToken, setDiscordToken] = useLocalStorage('discordToken', null);

    useEffect(() => {
        let params = queryString.parse(props.location.hash)
        if(params.access_token != null) {
            setDiscordToken(params.access_token);
            console.log("set discord access token!", params.access_token, discordToken)
            // props.dispatch(setAccessToken(params.access_token));
            //TODO have to reload page after logging in for userdata to load (useEffect in app.js gets called even tho discordToken is still null HMMMMM
            props.dispatch(setLoggedIn(true));
            history.push("/app");
            window.location.reload();

        } else {
            props.dispatch(setLoggedIn(false));
        }

    }, [discordToken, history, props, setDiscordToken])
    return(
        <div/>
    )
}));