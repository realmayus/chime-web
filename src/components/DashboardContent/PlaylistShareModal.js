import React, {useEffect, useState} from "react"
import ReactModal from "react-modal"
import styles from "../../assets/modal.module.sass"
import {FRONTEND_URL} from "../../constants"
import {connect} from "react-redux"
import {faClone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {copyTextToClipboard} from "../../util";
import AnimatedComp from "../Minor/AnimatedComp";

const mapStateToProps = (state) => {
    return {
        discordID: state.discordID,
        username: state.username
    }
}

export default connect(mapStateToProps)(function PlaylistCloneModal(props) {
    let [isOpened, setOpened] = useState(false)
    let [hasCopied, setHasCopied] = useState(false)

    useEffect(() => {
        if(props.showModal !== isOpened) {
            setOpened(props.showModal)
            if (!props.showModal) {
                setHasCopied(false);
            }
        }
    }, [isOpened, props.showModal])



    return(
        <div>
            <ReactModal
                isOpen={isOpened}
                contentLabel={"Share"}
                onRequestClose={() => {
                    props.onClose();
                }}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
            >
                <h2>Share</h2>
                <div className={styles.form} style={{marginBottom: 20}}>
                    <p>Use this link to share this playlist, click to copy:</p>
                    <code onClick={() => {
                        copyTextToClipboard(FRONTEND_URL + "/view/" + encodeURIComponent(window.btoa(unescape(encodeURIComponent(props.discordID + ":" + props.playlistID + ":" + props.name + ":" + props.username)))));
                        setHasCopied(true);
                    }} className={styles.shareLink}>{FRONTEND_URL + "/view/" + encodeURIComponent(window.btoa(unescape(encodeURIComponent(props.discordID + ":" + props.playlistID + ":" + props.name + ":" + props.username))))}</code>

                </div>
                {hasCopied &&
                <AnimatedComp>
                    <div style={{textAlign: "center"}}>
                        <FontAwesomeIcon icon={faClone} style={{marginRight: 10}} />
                        <span>Copied!</span>
                    </div>
                </AnimatedComp>

                }

            </ReactModal>
        </div>
    )
})