import React, {useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import styles from "../../assets/modal.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowLeft, faArrowRight, faExclamationCircle, faSearch} from "@fortawesome/free-solid-svg-icons"
import IconPillButton from "../Minor/IconPillButton"
import {BACKEND_URL} from "../../constants"
import {connect} from "react-redux"
import {SpinnerMedium} from "../Minor/Spinner"
import {getPrettyTimeDelta, useLocalStorage} from "../../util";

const mapStateToProps = (state) => {
    return {
        accessToken: state.accessToken
    }
}


export default connect(mapStateToProps)(function SongAddModal(props) {
    let [isOpened, setOpened] = useState(false)
    let [searchQuery, setSearchQuery] = useState("")
    let [results, setResults] = useState([])
    let [currentlyLoading, setCurrentlyLoading] = useState(false)
    let [dontClose, setDontClose] = useState(false)
    let [showResults, setShowResults] = useState(true)
    let [error, setError] = useState("")
    let resultsWrapper = useRef(null)
    const [discordToken,] = useLocalStorage('discordToken', null);

    useEffect(() => {
        if(props.showModal !== isOpened) {
            setOpened(props.showModal)
        }
    }, [isOpened, props.showModal])

    const handleFormSubmit = e => {
        setShowResults(false);
        e.preventDefault()
        if (searchQuery === "") {
            setError("Please enter a search term.");
            return;
        }
        setCurrentlyLoading(true);
        fetch(BACKEND_URL + "/getSearchResults?token=" + /*props.accessToken*/ discordToken + "&query=" + encodeURIComponent(searchQuery)).then(res => res.json()).then(res => {
            setError("");
            if(res.hasOwnProperty("loadType") && res.loadType === "NO_MATCHES") {
                setError("No videos found!");
                setCurrentlyLoading(false);
                return;
            }
            if(res.hasOwnProperty("loadType") && res.loadType !== "SEARCH_RESULT" && res.loadType !== "TRACK_LOADED" && res.loadType !== "PLAYLIST_LOADED") {
                setError("Couldn't load video.");
                setCurrentlyLoading(false);
                return;
            }
            if(res.hasOwnProperty("tracks")) {
                let results_ = res.tracks;
                setResults(results_);
                setShowResults(true);
                setCurrentlyLoading(false);
            } else {
                setError("Couldn't fetch backend, please see log!");
                setCurrentlyLoading(false);
                console.log(res);
            }
        }).catch(err => {
            setError("Couldn't fetch backend, please see log!");
            setCurrentlyLoading(false);
            console.log(err);
        })
    }
    const scroll = (direction) => {
        if(direction === "right") {
            resultsWrapper.current.scrollBy({left: 307, top: 0, behavior: "smooth"});
        } else {
            resultsWrapper.current.scrollBy({left: -307, top: 0, behavior: "smooth"});
        }
    }

    const handleSongSelect = (item) => {
        props.onSongSelect(item)
        if(!dontClose) {
            handleClose()
        }
    }

    const handleClose = () => {
        setDontClose(false);
        setResults([])
        setSearchQuery("")
        setError("");
        props.onClose();
    }

    return(
        <div>
            <ReactModal
                isOpen={isOpened}
                contentLabel={"Add Song"}
                onRequestClose={handleClose}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
            >
                <h2>Add Song</h2>
                <form className={styles.form} onSubmit={handleFormSubmit}>
                    <input className={styles.search} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                    <IconPillButton icon={faSearch} text={"Search"} inverted={true}/>
                </form>
                { error.length > 0 &&
                    <div className={styles.warningWrapper}>
                        <FontAwesomeIcon className={styles.warningIcon} icon={faExclamationCircle}/>
                        <p>{error}</p>
                    </div>
                }
                { results.length > 0 && showResults &&
                <div>
                    <label className={styles.checkboxContainer}> Don't close window automatically
                        <input
                            type="checkbox"
                            value={dontClose}
                            onChange={e => setDontClose(e.target.checked)}
                        />
                        <span className={styles.checkmark}/>
                    </label>

                    <div className={styles.contentWrapper}>
                        <button className={styles.navButton} onClick={() => scroll("left")}><FontAwesomeIcon
                            icon={faArrowLeft}/></button>
                        <div className={styles.resultsOuterWrapper} ref={resultsWrapper}>
                            {results.map((item, i) => (
                                <div key={i} >
                                    <div className={styles.resultWrapper} onClick={() => handleSongSelect(item)}>
                                        <img src={`https://img.youtube.com/vi/${encodeURIComponent(item.info.identifier)}/0.jpg`} alt="thumbnail"
                                             className={styles.resultThumbnail}/>
                                        <h3 className={styles.resultTitle}>{item.info.title}</h3>
                                        <p>{getPrettyTimeDelta(item.info.length)} • {item.info.author}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className={styles.navButton} onClick={() => scroll("right")}><FontAwesomeIcon
                            icon={faArrowRight}/></button>
                    </div>
                </div>

                }
                { currentlyLoading &&
                    <div className={styles.spinnerWrapper}>
                        <SpinnerMedium/>
                    </div>
                }


            </ReactModal>
        </div>
    )
})