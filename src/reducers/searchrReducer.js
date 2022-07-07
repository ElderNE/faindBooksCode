export const initialState = {
    oneBook: 31,
}

export function SearchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ONE_BOOK':
          return { ...state, oneBook: action.payload } 
        default:
          return state
    }
}