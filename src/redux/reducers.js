import {
    ADD_PLAYLIST, REMOVE_PLAYLIST,
    RENAME_PLAYLIST,
    SET_ACCESS_TOKEN,
    SET_AVATAR_URL,
    SET_DATA,
    SET_LOGGED_IN,
    SET_USERNAME
} from "./actions"

const initialState = {
    accessToken: null,
    isLoggedIn: false,
    username: null,
    avatarURL: null,
    data: null
}


function loginReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return Object.assign({}, state, {
                accessToken: action.accessToken
            })
        case SET_LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn
            })
        case SET_USERNAME:
            return Object.assign({}, state, {
                username: action.username
            })
        case SET_AVATAR_URL:
            return Object.assign({}, state, {
                avatarURL: action.avatarURL
            })
        case SET_DATA:
            return Object.assign({}, state, {
                data: action.data
            })
        case ADD_PLAYLIST:
            return {
                ...state,
                data: {
                    ...state.data,
                    playlists: [
                        ...state.data.playlists,
                        action.playlist
                    ]

                }
            }
        case RENAME_PLAYLIST:
            return {
                ...state,
                data: {
                    ...state.data,
                    playlists: [
                        ...state.data.playlists.filter(item => item.ref !== action.ref),
                        {name: action.newName, ref: action.ref}
                    ]

                }
            }
        case REMOVE_PLAYLIST:
            return {
                ...state,
                data: {
                    ...state.data,
                    playlists: [
                        ...state.data.playlists.filter(item => item.ref !== action.ref)
                    ]
                }
            }
        default:
            return state
    }
}

export default loginReducer