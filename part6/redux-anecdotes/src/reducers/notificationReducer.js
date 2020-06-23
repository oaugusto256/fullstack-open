const initialState = {
  showNotification: false,
  message: "",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        showNotification: true,
        message: action.data.message
      }
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message
    }
  }
}

const resetState = () => {
  return {
    type: 'RESET_STATE'
  }
}

export {
  reducer,
  resetState,
  showNotification
}