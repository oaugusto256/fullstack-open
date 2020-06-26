const initialState = {
  showNotification: false,
  message: "",
}

const SECONDS_TO_MILISECONDS = 1000;

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

const showNotification = (message, secondsToDisappear) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message
      }
    });

    setTimeout(() => {
      dispatch({ type: 'RESET_STATE' });
    }, secondsToDisappear * SECONDS_TO_MILISECONDS);
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