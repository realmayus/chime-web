import React, {useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import styles from "../../assets/modal.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowLeft, faArrowRight, faSearch} from "@fortawesome/free-solid-svg-icons"
import IconPillButton from "../Minor/IconPillButton"
import {BACKEND_URL} from "../../constants"
import {connect} from "react-redux"
import {SpinnerMedium} from "../Minor/Spinner"

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
    let resultsWrapper = useRef(null)

    useEffect(() => {
        if(props.showModal !== isOpened) {
            setOpened(props.showModal)
        }
    }, [isOpened, props.showModal])

    const handleFormSubmit = e => {
        setShowResults(false);
        e.preventDefault()
        setCurrentlyLoading(true)
        fetch(BACKEND_URL + "/getSearchResults?token=" + props.accessToken + "&query=" + encodeURIComponent(searchQuery)).then(res => res.json()).then(res => {
            console.log(res)
            if(res.hasOwnProperty("results")) {
                let results_ = res.results
                setResults(results_)
                setShowResults(true);
                setCurrentlyLoading(false)
            } else {
                alert("Couldn't fetch backend, please see log!")
                setCurrentlyLoading(false)
                console.log(res)
            }
        }).catch(err => {
            alert("Couldn't fetch backend, please see log!")
            setCurrentlyLoading(false)
            console.log(err)
        })
    }
    const scroll = (direction) => {
        if(direction === "right") {
            resultsWrapper.current.scrollBy({left: 307, top: 0, behavior: "smooth"})
        } else {
            resultsWrapper.current.scrollBy({left: -307, top: 0, behavior: "smooth"})
        }
    }

    const handleSongSelect = (item) => {
        props.onSongSelect(item)
        if(!dontClose) {
            setResults([])
            setSearchQuery("")
            handleClose()
        }
    }

    const handleClose = () => {
        setDontClose(false);
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
                                <div>
                                    { !(item.video.upload_date === undefined || item.video.upload_date === "") &&  // YouTube mixes don't have upload dates so we can filter them out using this check
                                    <div className={styles.resultWrapper} key={i} onClick={() => handleSongSelect(item)}>
                                        <img src={item.video["thumbnail_src"]} alt="thumbnail"
                                             className={styles.resultThumbnail}/>
                                        <h3 className={styles.resultTitle}>{item.video.title}</h3>
                                        <p>{item.video.views} • {item.uploader.username}</p>
                                    </div>
                                    }
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