import React, { useEffect, useState} from "react"
import styles from "./DashboardContent.module.sass"
import TrackItem from "../Minor/TrackItem"
import IconPillButton from "../Minor/IconPillButton"
import {faCheck, faClone, faExclamationTriangle, faPlus, faShare} from "@fortawesome/free-solid-svg-icons"
import update from 'immutability-helper'
import {compare_arrays, encodeTrackToBase64, hmsToSecondsOnly, strip, useLocalStorage, uuidv4} from "../../util"
import {useDrop} from "react-dnd"
import {ItemTypes} from "../../assets/ItemTypes"
import SongAddModal from "./SongAddModal"
import {useParams} from "react-router-dom"
import {connect} from "react-redux"
import {BACKEND_URL} from "../../constants"
import { useLocation, useHistory } from 'react-router-dom'
import {SpinnerBig} from "../Minor/Spinner"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt"
import PlaylistEditModal from "./PlaylistEditModal"


const mapStateToProps = (state) => {
    return {
        data: state.data,
        isLoggedIn: state.isLoggedIn,
        // accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(function DashboardContentPlaylist(props) {
    const [changesMade, setChangesMade] = useState(false)
    const { playlistID } = useParams()
    const [cardsInitial, setCardsInitial] = useState([])
    const [cards, setCards] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentlySaving, setCurrentlySaving] = useState(false)
    const [currentlyLoading, setCurrentlyLoading] = useState(false)
    const [error, setError] = useState("")
    let location = useLocation()
    let history = useHistory()
    const [discordToken,] = useLocalStorage('discordToken', null);


    useEffect(() => {
        setCards([])
        setCardsInitial([])
        setCurrentlySaving(false)
        setShowAddModal(false)
        setChangesMade(false)
        setCurrentlyLoading(false)
        setError("")
    }, [location])

    const moveCard = (id, atIndex) => {
        const { card, index } = findCard(id)
        setCards(
            update(cards, {
                $splice: [
                    [index, 1],
                    [atIndex, 0, card],
                ],
            }),
        )
    }

    const renderCard = (item, index) => {
        return (
            <TrackItem
                key={item.id}
                index={index}
                id={item.id}
                moveCard={moveCard}
                title={item.title}
                artist={item.author}
                duration={item.duration}
                url={item.url}
                findCard={findCard}
                removeClickHandler={removeItemFromPlaylist}
            />
        )
    }

    const findCard = (id) => {
        const card = cards.filter((c) => `${c.id}` === id)[0]
        return {
            card,
            index: cards.indexOf(card),
        }
    }
    const [, drop] = useDrop({ accept: ItemTypes.CARD })

    const getPlaylist = () => {
        if(props.data != null) {
            return props.data.playlists.find(item => item.ref === playlistID)
        } else {
            return null
        }
    }
    useEffect(() => {
        if(props.isLoggedIn) {
            setCurrentlyLoading(true)
            fetch(BACKEND_URL + "/getPlaylist?token=" + /*props.accessToken*/ discordToken + "&playlist=" + playlistID).then(res => res.json()).then(res => {
                if(res.hasOwnProperty("data") && res.data.hasOwnProperty("contents")) {
                    let contents = res.data.contents
                    setCardsInitial(contents)
                    setCards(contents)

                } else if(res.hasOwnProperty("error"))  {
                    setError(res.errorCode)
                }
                setCurrentlyLoading(false)
            })
        }
    }, [discordToken, location/*, props.accessToken*/, playlistID, props.isLoggedIn])

    useEffect(() => {
        if(props.data != null && props.data.hasOwnProperty("playlists")) {
            if(!compare_arrays(cards, cardsInitial)) {
                setChangesMade(true)
                window.onbeforeunload = () => true //show confirm dialog when user wants to close/reload tab
            } else {
                if(changesMade === true) {
                    setChangesMade(false)
                }
                window.onbeforeunload = () => null //disable confirm dialog when user wants to close/reload tab
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards, props.data, changesMade])

    const removeItemFromPlaylist = (id) => {
        setCards(cards.filter(element => element.id !== id))
    }

    const addSong = (video) => {
        let videoData = {url: strip(video.video.url), author: strip(video.uploader.username), videoID: strip(video.video.id), duration: hmsToSecondsOnly(strip(video.video.duration))*1000, id: uuidv4(), title: strip(video.video.title)}

        videoData.data = encodeTrackToBase64({title: videoData.title, artist: videoData.author, duration: videoData.duration, videoID: videoData.videoID, url: videoData.url})
        setCards([...cards, videoData])
    }

    const saveChanges = () => {
        //Loading indicator = on
        setCurrentlySaving(true)
        fetch(BACKEND_URL + "/setPlaylist?token=" + /*props.accessToken*/ discordToken + "&playlist=" + playlistID,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cards})
            }).then(res => res.json()).then(res => {
                if(res.hasOwnProperty("status") && res.status === "OK") {
                    setCardsInitial(cards)
                    setChangesMade(false)
                    setCurrentlySaving(false)
                } else {
                    alert("Couldn't set playlist. Please see log.")
                    setCurrentlySaving(false)
                    console.log(res)
                }
            }).catch(err => {
                alert("Couldn't set playlist. Please see log.")
                setCurrentlySaving(false)
                console.log(err)
            })
    }

    if(getPlaylist() == null) {
        history.push("/app")
        return null
    }

    return(
        <div>
                <div>
                    {error === ""
                        ? <div>
                            <div className={styles.titleWrapper}><span
                                className={styles.title}>{getPlaylist().name}</span><FontAwesomeIcon
                                onClick={() => setShowEditModal(true)} className={styles.editIcon} icon={faPencilAlt}/></div>
                                <div className={styles.actionContainer}>
                                    <IconPillButton icon={faPlus} text="Add" onclick={() => setShowAddModal(true)}/>
                                    <IconPillButton icon={faClone} text="Clone" onclick={() => alert("WIP")}/>
                                    <IconPillButton icon={faShare} text="Share" onclick={() => alert("WIP")}/>
                                    {changesMade &&
                                    <IconPillButton inverted={true} icon={faCheck} text="Save Changes" onclick={saveChanges}
                                                    loading={currentlySaving}/>
                                    }
                                </div>
                                {currentlyLoading &&
                                    <div className={styles.spinnerWrapper}>
                                    <SpinnerBig/>
                                    </div>
                                }
                                <div className={styles.songList} ref={drop}>
                                {cards.map((card, i) => renderCard(card, i))}

                            </div>
                          </div>
                        : <div className={styles.errorWrapper}>
                              <FontAwesomeIcon className={styles.errorIcon} icon={faExclamationTriangle}/>
                              <p className={styles.errorText}>An unknown error occurred. If this keeps happening, please ask for help on our support discord.</p>
                              <p className={styles.errorCode}>{error}</p>
                          </div>
                    }

                </div>
            <SongAddModal onSongSelect={addSong} showModal={showAddModal} onClose={() => setShowAddModal(false)}/>
            <PlaylistEditModal showModal={showEditModal} onClose={() => setShowEditModal(false)} name={getPlaylist().name} playlistID={getPlaylist().ref}/>
        </div>

    )
})
