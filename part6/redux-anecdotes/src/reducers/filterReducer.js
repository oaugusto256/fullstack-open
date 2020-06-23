const initialState = {
  filterBy: "",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_BY':
      return {
        filterBy: action.data.filterBy
      }
    default:
      return state;
  }
}

const filterBy = (filterBy) => {
  return {
    type: 'FILTER_BY',
    data: {
      filterBy
    }
  }
}

export {
  reducer,
  filterBy
}