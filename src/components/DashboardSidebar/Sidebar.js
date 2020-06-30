import React, {useState} from "react"
import styles from "./Sidebar.module.sass"
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus"
import PlaylistAddModal from "./PlaylistAddModal"


const mapStateToProps = (state) => {
    return {
        data: state.data,
        accessToken: state.accessToken
    }
}

export default withRouter(connect(mapStateToProps)(function Sidebar(props) {

    let [showPlaylistAddModal, setShowPlaylistAddModal] = useState(false)

    const currentlySelected = (id) => {
        let pathID
        if(props.location.pathname.startsWith("/app/p/")) {
            pathID = props.location.pathname.split("/app/p/")[1]
        } else if(props.location.pathname.startsWith("/app/g/")) {
            pathID = props.location.pathname.split("/app/g/")[1]
        }
        return pathID === id
    }


    return (
        <div className={styles.sideBar}>
            <ul className={styles.list}>
                <li className={styles.category + " " + styles.listItem}>PLAYLISTS <div onClick={() => setShowPlaylistAddModal(true)} className={styles.addIconWrapper}><FontAwesomeIcon className={styles.addIcon} icon={faPlus}/></div></li>
                {props.data != null && props.data.playlists.map((item, i) => (
                    <Link key={i} to={"/app/p/" + item.ref} className={styles.a}><li className={styles.listItem + (currentlySelected(item.ref) ? " " + styles.listItemSelected : "")}>{item.name}</li></Link>
                ))}
            </ul>
            <PlaylistAddModal showModal={showPlaylistAddModal} onClose={() => setShowPlaylistAddModal(false)}/>
        </div>
    )
}))