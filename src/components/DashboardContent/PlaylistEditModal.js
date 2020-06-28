import React, {useEffect, useState} from "react"
import ReactModal from "react-modal"
import styles from "../../assets/modal.module.sass"
import {faExclamationCircle, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons"
import IconPillButton from "../Minor/IconPillButton"
import {BACKEND_URL} from "../../constants"
import {connect} from "react-redux"
import {useHistory, useLocation} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {renamePlaylist, deletePlaylist} from "../../redux/actions"
import {useLocalStorage} from "../../util";


export default connect()(function PlaylistEditModal(props) {
    let [isOpened, setOpened] = useState(false)
    let [playlistName, setPlaylistName] = useState(props.name)
    let [currentlyLoadingRename, setCurrentlyLoadingRename] = useState(false)
    let [currentlyLoadingDelete, setCurrentlyLoadingDelete] = useState(false)
    let [error, setError] = useState("")
    const history = useHistory()
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
        setPlaylistName(props.name)
    }, [props.name])

    const handleRenamePlaylist = () => {
        setError("")
        if(playlistName.length <= 2) {
            setError("Name has to be three characters or more")
            return
        }
        setCurrentlyLoadingRename(true)
        fetch(BACKEND_URL + "/renamePlaylist?token=" + /*props.accessToken*/ discordToken + "&playlist=" + props.playlistID + "&newName=" + playlistName).then(res => res.json())
            .then(res => {
                if (res.hasOwnProperty("status") && res.status === "OK") {
                    props.dispatch(renamePlaylist(props.playlistID, playlistName))
                    setError("")
                    props.onClose()
                    setCurrentlyLoadingRename(false)
                } else {
                    setCurrentlyLoadingRename(false)
                    setError(res["error"] || "Couldn't rename playlist, please check log.")
                    console.log(res)
                }
            }).catch(err => {
                setCurrentlyLoadingRename(false)
                setError(err["error"] || "Couldn't rename playlist, please check log.")
                console.log(err)
            })
    }

    const deletePlaylistHandler = () => {
        setError("")
        setCurrentlyLoadingDelete(true)
        fetch(BACKEND_URL + "/deletePlaylist?token=" + /*props.accessToken*/ discordToken + "&playlist=" + props.playlistID).then(res => res.json())
            .then(res => {
                if(res.hasOwnProperty("status") && res.status === "OK") {
                    setCurrentlyLoadingDelete(false)
                    props.onClose()
                    history.push("/app")
                    props.dispatch(deletePlaylist(props.playlistID))
                } else {
                    setCurrentlyLoadingDelete(false)
                    console.log(res)
                    setError(res["error"] || "Couldn't delete playlist, please check log.")

                }
            }).catch(err => {
                setCurrentlyLoadingDelete(false)
                console.log(err)
                setError(err["error"] || "Couldn't delete playlist, please check log.")

        })
    }

    return(
        <div>
            <ReactModal
                isOpen={isOpened}
                contentLabel={"Edit"}
                onRequestClose={() => {
                    setError("");
                    props.onClose();
                }}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
            >
                <h2>Edit</h2>
                <div className={styles.form} style={{marginBottom: 20}}>
                    <input className={styles.search} type="text" value={playlistName} onChange={e => setPlaylistName(e.target.value)}/>
                    <IconPillButton disabled={props.name === playlistName || playlistName === ""} onclick={handleRenamePlaylist} icon={faPencilAlt} text={"Rename"} inverted={true} loading={currentlyLoadingRename}/>
                </div>

                {error.length > 0 &&
                    <div className={styles.warningWrapper}>
                        <FontAwesomeIcon className={styles.warningIcon} icon={faExclamationCircle} size="1x"/>
                        <p>{error}</p>
                    </div>
                }
                <IconPillButton onclick={deletePlaylistHandler} icon={faTrash} text={"Delete"} inverted={false} loading={currentlyLoadingDelete}/>

            </ReactModal>
        </div>
    )
})