export const SET_USER = 'SET_USER'

export const setUser = user => ({
    type: SET_USER,
    payload: user
})

const initialState = {
    user : {
        id: 0,
        username: '',
        level: ''
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    username : action.payload.username,
                    level: action.payload.level
                }
            }
        
        default:
            return state
    }
}

export default rootReducer