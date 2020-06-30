import React from "react"
import styles from "./TrackItem.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars, faLink, faTrash} from "@fortawesome/free-solid-svg-icons"
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../assets/ItemTypes'
import {getPrettyTimeDelta} from "../../util"


export default function TrackItem(props) {
    const originalIndex = props.findCard(props.id).index
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id: props.id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, originalIndex } = monitor.getItem()
            const didDrop = monitor.didDrop()
            if (!didDrop) {
                props.moveCard(droppedId, originalIndex)
            }
        },
    })
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== props.id) {
                const { index: overIndex } = props.findCard(props.id)
                props.moveCard(draggedId, overIndex)
            }
        },
    })
    const opacity = isDragging ? 0.1 : 1

    return(
        <div className={styles.wrapper} ref={(node) => drag(drop(node))} style={{opacity}}>
            <FontAwesomeIcon icon={faBars} className={styles.handle}/>
            <span className={styles.title}>{props.title}</span>
            <span className={styles.artist}>{props.artist}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.duration}>{getPrettyTimeDelta(props.duration)}</span>
            <FontAwesomeIcon className={styles.icon} icon={faLink} onClick={() => window.location.href = props.url}/>
            <FontAwesomeIcon className={styles.icon} icon={faTrash} onClick={() => props.removeClickHandler(props.id)}/>
        </div>
    )
}