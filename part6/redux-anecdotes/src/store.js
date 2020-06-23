import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer as anecdoteReducer } from './reducers/anecdoteReducer'
import { reducer as NotificationReducer } from './reducers/notificationReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: NotificationReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store;