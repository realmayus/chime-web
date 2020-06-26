import humanizeDuration from "humanize-duration"
import DataBuffer from "./DataBuffer"
import {useEffect, useState} from "react";

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8)
        return v.toString(16)
    })
}


export function compare_arrays(array1, array2) {
    return (array1.length === array2.length) && array1.every(function(element, index) {
        return element === array2[index]
    })
}

const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    languages: {
        shortEn: {
            y: () => "y",
            mo: () => "mo",
            w: () => "w",
            d: () => "d",
            h: () => "h",
            m: () => "m",
            s: () => "s",
            ms: () => "ms",
        },
    },
})

export function get_pretty_time_delta(millis) {
    return shortEnglishHumanizer(millis, { delimiter: " ", spacer: "" })
}

export function hmsToSecondsOnly(str) {
    let p = str.split(':'),
        s = 0, m = 1

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10)
        m *= 60
    }

    return s
}

/*
    This function generates a base64 data string that is compatible with Lavaplayer.
    It's required so that chime can "reconstruct" the track without having to look it up by its URL which is
    time-consuming.
 */
export function encodeTrackToBase64(track) {
    let dataBuffer = new DataBuffer()
    dataBuffer.write(2)
    dataBuffer.writeUTF8(removeNonAscii(track.title))
    dataBuffer.writeUTF8(removeNonAscii(track.artist))
    dataBuffer.writeLong(track.duration)
    dataBuffer.writeUTF8(track.videoID)
    dataBuffer.writeBoolean(false)
    dataBuffer.writeBoolean(true)
    dataBuffer.writeUTF8(track.url)
    dataBuffer.writeUTF8("youtube")
    dataBuffer.writeLong(0)

    return dataBuffer.getLavaplayerBase64()
}

export function strip(str) {
    if(str !== undefined) {
        return str.replace(/^\s+|\s+$/g, '')
    }
}

export function removeNonAscii(str) {
    // eslint-disable-next-line no-control-regex
    return str.replace(/[^\x00-\x7F]/g, "");
}

export function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            console.log(item)
            return item;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key,valueToStore);
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}
// export function useLocalStorage(key, initialValue) {
//     // State to store our value
//     // Pass initial state function to useState so logic is only executed once
//     const [storedValue, setStoredValue] = useState(() => {
//         try {
//             // Get from local storage by key
//             const item = window.localStorage.getItem(key);
//             console.log(item)
//
//             // Parse stored json or if none return initialValue
//             return item ? JSON.parse(item) : initialValue;
//         } catch (error) {
//             // If error also return initialValue
//             console.log(error);
//             return initialValue;
//         }
//     });
//
//     // Return a wrapped version of useState's setter function that ...
//     // ... persists the new value to localStorage.
//     const setValue = value => {
//         try {
//             // Allow value to be a function so we have same API as useState
//             const valueToStore =
//                 value instanceof Function ? value(storedValue) : value;
//             // Save state
//             setStoredValue(valueToStore);
//             // Save to local storage
//             window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         } catch (error) {
//             // A more advanced implementation would handle the error case
//             console.log(error);
//         }
//     };
//     return [storedValue, setValue];
// }



/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref, handleOutside) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleOutside()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleOutside, ref]);
}