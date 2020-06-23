const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export {
  filterReducer,
  filterChange
}
