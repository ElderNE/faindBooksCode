export const initialState = {
    fullText: '',
    categories: '', 
    sortingBy: 'relevance',
    startIndex: 0,
    searching: false,
    main: '20',
    jsonContainer: {},
  }
  
  export function AppReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FULL_TEXT':
          return { ...state, fullText: action.payload }
        case 'SET_CATEGORIES':
          return { ...state, categories: action.payload }
        case 'SET_SOTRING_BY':
          return { ...state, sortingBy: action.payload }
        case 'SET_START_INDEX':
          return { ...state, startIndex: action.payload } 
        case 'WAIT_SEARCHING':
          return { ...state, searching: action.payload }
        case 'SET_MAIN':
          return { ...state, main: action.payload }
        case 'SET_JASONCONTAINER':
          return { ...state, jsonContainer: action.payload } 
        default:
          return state
    }
  }