import React, {useRef, useState} from "react"
import styles from "./PlaybackViewer.module.sass"
import {useOutsideAlerter} from "../../util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward, faForward, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";

export default function PlaybackViewer() {
    const [sliderPos, setSliderPos] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const dragArea = useRef(null)

    useOutsideAlerter(dragArea, () => setIsClicked(false));

    const startDrag = () => {
        setIsClicked(true);
    }

    const doDrag = (e) => {
        if(isClicked) {
            let rect = dragArea.current.getBoundingClientRect()
            setSliderPos(e.clientX - rect.left - 5)
        }
    }

    const endDrag = () => {
        setIsClicked(false);
    }

    return(
        <div className={styles.wrapper} onMouseMove={e => doDrag(e)}  >
            <div className={styles.songInfoWrapper}>
                <img className={styles.cover} src={"https://img.youtube.com/vi/fN_BRGT2j5o/maxresdefault.jpg"} alt="cover"/>
                <div className={styles.songInfoTextWrapper}>
                    <p className={styles.headline}>CURRENTLY PLAYING</p>
                    <p className={styles.title}>Always Home [new EP]</p>
                    <p className={styles.artist}>Chillhop Music</p>
                </div>
            </div>
            <div ref={dragArea} className={styles.progressWrapper} onMouseUp={endDrag}>
                <div className={styles.progress} style={{width: sliderPos}}/>
                <div draggable={false} className={styles.progressButton} onMouseDown={startDrag} />
            </div>
            <div className={styles.mediaButtons}>
                <FontAwesomeIcon className={styles.mediaButton} icon={faBackward}/>
                { isPaused
                    ? <FontAwesomeIcon className={styles.mediaButton} icon={faPlay} onClick={() => setIsPaused(false)}/>
                    : <FontAwesomeIcon className={styles.mediaButton} icon={faPause} onClick={() => setIsPaused(true)}/>
                }
                <FontAwesomeIcon className={styles.mediaButton} icon={faForward}/>
            </div>
        </div>
    )
}