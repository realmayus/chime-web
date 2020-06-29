import React, {useEffect, useState} from "react"
import ReactModal from "react-modal"
import styles from "../../assets/modal.module.sass"
import {faClone, faExclamationCircle} from "@fortawesome/free-solid-svg-icons"
import IconPillButton from "../Minor/IconPillButton"
import {BACKEND_URL} from "../../constants"
import {connect} from "react-redux"
import {useLocation} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { addPlaylist} from "../../redux/actions"
import {useLocalStorage} from "../../util";


const mapStateToProps = (state) =>  {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(function PlaylistCloneModal(props) {
    let [isOpened, setOpened] = useState(false)
    let [playlistName, setPlaylistName] = useState("")
    let [currentlyLoading, setCurrentlyLoading] = useState(false)
    let [error, setError] = useState("")
    let location = useLocation()
    const [discordToken,] = useLocalStorage('discordToken', null);


    useEffect(() => {
        setError("");
    }, [location])

    useEffect(() => {
        if(props.showModal !== isOpened) {
            setOpened(props.showModal)
        }
    }, [isOpened, props.showModal])

    useEffect(() => {
        setPlaylistName("Clone of " + props.name)
    }, [props.name])

    const handleClone = () => {
        setError("")
        if(playlistName.length <= 2) {
            setError("Name has to be three characters or more")
            return
        }
        setCurrentlyLoading(true)
        let url;
        console.log(props.sharecode)
        if (props.sharecode == null) {
            url = BACKEND_URL + "/clonePlaylist?token=" + discordToken + "&playlist=" + props.playlistID + "&newName=" + playlistName;
        } else {
            url = BACKEND_URL + "/clonePlaylist?token=" + discordToken + "&sharecode=" + props.sharecode + "&newName=" + playlistName;
        }

        fetch(url).then(res => res.json())
            .then(res => {
                if (res.hasOwnProperty("status") && res.status === "OK") {
                    props.dispatch(addPlaylist({ref: res.id, name: playlistName}))
                    setError("")
                    props.onClose()
                    setCurrentlyLoading(false)
                } else {
                    setCurrentlyLoading(false)
                    setError(res["error"] || "Couldn't clone playlist, please check log.")
                    console.log(res)
                }
            }).catch(err => {
            setCurrentlyLoading(false)
                setError(err["error"] || "Couldn't clone playlist, please check log.")
                console.log(err)
            })
    }

    return(
        <div>
            <ReactModal
                isOpen={isOpened}
                contentLabel={"Clone"}
                onRequestClose={() => {
                    setError("");
                    props.onClose();
                }}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
            >
                <h2>Clone</h2>
                { props.isLoggedIn ?
                    <div className={styles.form} style={{marginBottom: 20}}>
                    <input className={styles.search} type="text" value={playlistName}
                           onChange={e => setPlaylistName(e.target.value)}/>
                    <IconPillButton disabled={props.name === playlistName || playlistName === ""} onclick={handleClone}
                                    icon={faClone} text={"Clone"} inverted={true} loading={currentlyLoading}/>
                </div>
                : <p>You have to log in to clone this playlist.</p>
                }

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