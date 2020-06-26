import React, {useEffect, useState} from "react"
import ReactModal from "react-modal"
import styles from "../../assets/modal.module.sass"
import IconPillButton from "../Minor/IconPillButton"
import {BACKEND_URL} from "../../constants"
import {connect} from "react-redux"
import {addPlaylist} from "../../redux/actions"
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {useLocation} from "react-router-dom";
import {useLocalStorage} from "../../util";

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(function PlaylistAddModal(props) {
    let [isOpened, setOpened] = useState(false)
    let [playlistName, setPlaylistName] = useState("")
    let [currentlyLoading, setCurrentlyLoading] = useState(false)
    let [error, setError] = useState("")
    let location = useLocation()
    const [discordToken,] = useLocalStorage('discordToken', null);


    useEffect(() => {
        setError("")
    }, [location])


    useEffect(() => {
        if(props.showModal !== isOpened) {
            setOpened(props.showModal)
        }
    }, [isOpened, props.showModal])

    const handleFormSubmit = e => {
        e.preventDefault()

        if(playlistName.length <= 2) {
            setError("Name has to be three characters or more")
            return
        }


        setCurrentlyLoading(true)
        fetch(BACKEND_URL + "/createPlaylist?token=" + /*props.accessToken*/ discordToken + "&playlist=" + encodeURIComponent(playlistName))
            .then(res => res.json())
            .then(res => {
                if(res.hasOwnProperty("status") && res.status === "OK") {
                    let id = res.id

                    props.dispatch(addPlaylist({name: playlistName, ref: id}))
                    setCurrentlyLoading(false)
                    props.onClose()
                } else {
                    setError(res["error"] || "Couldn't create playlist, please check log.")
                    setCurrentlyLoading(false)
                    console.log(res)
                }
            })
            .catch(err => {
                setCurrentlyLoading(false)
                setError(err["error"] || "Couldn't create playlist, please check log.")
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
                    <IconPillButton icon={faPlus} text={"Create"} inverted={true} loading={currentlyLoading}/>
                </form>
                {error.length > 0 &&
                    <div className={styles.warningWrapper}>
                        <FontAwesomeIcon className={styles.warningIcon} icon={faExclamationCircle} size="1x"/>
                        <p>{error}</p>
                    </div>
                }
            </ReactModal>
        </div>
    )
})