import React, {useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import styles from "../../assets/modal.module.sass"
import IconPillButton from "../Minor/IconPillButton"
import {BACKEND_URL} from "../../constants"
import {connect} from "react-redux"
import {SpinnerMedium} from "../Minor/Spinner"
import {addPlaylist} from "../../redux/actions"
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus"

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(function PlaylistAddModal(props) {
    let [isOpened, setOpened] = useState(false)
    let [playlistName, setPlaylistName] = useState("")
    let [currentlyLoading, setCurrentlyLoading] = useState(false)

    useEffect(() => {
        if(props.showModal !== isOpened) {
            setOpened(props.showModal)
        }
    }, [isOpened, props.showModal])

    const handleFormSubmit = e => {
        e.preventDefault()
        setCurrentlyLoading(true)
        fetch(BACKEND_URL + "/createPlaylist?token=" + props.accessToken + "&playlist=" + encodeURIComponent(playlistName))
            .then(res => res.json())
            .then(res => {
                if(res.hasOwnProperty("status") && res.status === "OK") {
                    let id = res.id

                    props.dispatch(addPlaylist({name: playlistName, ref: id}))
                    setCurrentlyLoading(false)
                    props.onClose()
                } else {
                    alert("Couldn't create playlist, please check log.")
                    console.log(res)
                }
            })
            .catch(err => {
                alert("Couldn't create playlist, please check log.")
                console.log(err)
            })

    }

    return(
        <div>
            <ReactModal
                isOpen={isOpened}
                contentLabel={"Add Playlist"}
                onRequestClose={props.onClose}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
            >
                <h2>Add Playlist</h2>
                <form className={styles.form} onSubmit={handleFormSubmit}>
                    <input className={styles.search} type="text" value={playlistName} onChange={e => setPlaylistName(e.target.value)}/>
                    <IconPillButton icon={faPlus} text={"Create"} inverted={true}/>
                </form>
                <div className={styles.spinnerWrapper} style={{visibility: currentlyLoading ? "unset" : "hidden"}}>
                    <SpinnerMedium/>
                </div>


            </ReactModal>
        </div>
    )
})