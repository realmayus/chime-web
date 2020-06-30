import React, {useEffect, useState} from "react";
import styles from "../components/DashboardContent/DashboardContent.module.sass";
import {BACKEND_URL} from "../constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconPillButton from "../components/Minor/IconPillButton";
import {faClone, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {SpinnerBig} from "../components/Minor/Spinner";
import {useParams} from "react-router-dom";
import TrackItemRaw from "../components/Minor/TrackItemRaw";
import PlaylistCloneModal from "../components/DashboardContent/PlaylistCloneModal";
import { Base64 } from 'js-base64';


export default function SharedView() {
    const [currentlyLoading, setCurrentlyLoading] = useState(false)
    const [showCloneModal, setShowCloneModal] = useState(false)
    const [error, setError] = useState("")
    const [cards, setCards] = useState([])
    const { sharecode } = useParams()

    const renderCard = (item, index) => {
        return (
            <TrackItemRaw
                key={item.id}
                index={index}
                id={item.id}
                title={item.title}
                artist={item.author}
                duration={item.duration}
                url={item.url}
            />
        )
    }

    const getDataFromB64 = () => {
        console.log(decodeURIComponent(sharecode))

        let decodedData = Base64.decode(sharecode);
        decodedData = decodedData.split(":")
        return {
            userID: decodedData[0],
            playlistID: decodedData[1],
            name: decodedData[2],
            username: decodedData[3],
        }
    }

    useEffect(() => {
        setCurrentlyLoading(true)
        fetch(BACKEND_URL + "/getPlaylist?sharecode=" + sharecode).then(res => res.json()).then(res => {
            if(res.hasOwnProperty("data") && res.data.hasOwnProperty("contents")) {
                let contents = res.data.contents
                setCards(contents)

            } else if(res.hasOwnProperty("error"))  {
                setError(res.errorCode)
            }
            setCurrentlyLoading(false)
        })

    }, [sharecode])


    return(
        <div className={styles.sharedViewBody}>
            <div className={styles.titleWrapperSharedView}>
                <p className={styles.subtitle}>Shared Playlist - {getDataFromB64().username}</p>
                <span className={styles.title}>{getDataFromB64().name}</span>
            </div>
            {error === ""
                ? <div>
                    <div className={styles.actionContainer}>
                        <IconPillButton icon={faClone} text="Clone" onclick={() => setShowCloneModal(true)}/>
                    </div>
                    {currentlyLoading &&
                    <div className={styles.spinnerWrapper}>
                        <SpinnerBig/>
                    </div>
                    }
                    <div className={styles.songListSharedView}>
                        {cards.map((card, i) => renderCard(card, i))}

                    </div>
                </div>
                : <div className={styles.errorWrapper}>
                    <FontAwesomeIcon className={styles.errorIcon} icon={faExclamationTriangle}/>
                    <p className={styles.errorText}>An unknown error occurred. If this keeps happening, please ask for help on our support discord.</p>
                    <p className={styles.errorCode}>{error}</p>
                </div>
            }
            <PlaylistCloneModal showModal={showCloneModal} onClose={() => setShowCloneModal(false)} sharecode={sharecode} name={getDataFromB64().name}/>
        </div>
    )
}