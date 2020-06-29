export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_AVATAR_URL = 'SET_AVATAR_URL'
export const SET_DATA = 'SET_DATA'
export const SET_DISCORD_ID = "SET_DISCORD_ID"
export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const RENAME_PLAYLIST = 'RENAME_PLAYLIST'
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'


export function setLoggedIn(isLoggedIn) {
    return { type: SET_LOGGED_IN, isLoggedIn }
}

export function setDiscordID(discordID) {
    return { type: SET_DISCORD_ID, discordID }
}

export function setUsername(username) {
    return { type: SET_USERNAME, username }
}

export function setAvatarURL(avatarURL) {
    return { type: SET_AVATAR_URL, avatarURL }
}

export function setData(data) {
    return { type: SET_DATA, data }
}

export function addPlaylist(playlist) {
    return { type: ADD_PLAYLIST, playlist }
}

export function renamePlaylist(ref, newName) {
    return { type: RENAME_PLAYLIST, ref, newName }
}

export function deletePlaylist(ref) {
    return { type: REMOVE_PLAYLIST, ref }
}