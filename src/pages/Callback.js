import React, {useEffect} from "react";
import queryString from 'query-string';
import {connect} from "react-redux";
import {setAccessToken, setLoggedIn} from "../redux/actions";
import {useHistory, withRouter} from 'react-router-dom';


export default connect()(withRouter(function Callback(props) {
    const history = useHistory();

    useEffect(() => {
        let params = queryString.parse(props.location.hash)
        // setAccessToken(params.access_token)
        props.dispatch(setAccessToken(params.access_token));
        if(params.access_token !== null) {
            props.dispatch(setLoggedIn(true));
        } else {
            props.dispatch(setLoggedIn(false));
        }
        history.push("/app");
    }, [history, props])
    return(
        <div></div>
    )
}));