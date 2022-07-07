export function setFullText(text) {
    return {
      type: 'SET_FULL_TEXT',
      payload: text,
    }
}

export function setCategories(e) {
    return {
      type: 'SET_CATEGORIES',
      payload: e,
    }
}

export function setSortingBy(text) {
    return {
      type: 'SET_SOTRING_BY',
      payload: text,
    }
}

export function setStartIndex(numb) {
    return {
      type: 'SET_START_INDEX',
      payload: numb,
    }
}

export function waitSearching(searching) {
  return {
    type: 'WAIT_SEARCHING',
    payload: searching,
  }
}

export function setMain(main) {
  return {
    type: 'SET_MAIN',
    payload: main,
  }
}

export function setJasonContainer(obj) {
  return {
    type: 'SET_JASONCONTAINER',
    payload: obj,
  }
}

export function setOneBook(numb) {
  return {
    type: 'SET_ONE_BOOK',
    payload: numb,
  }
}