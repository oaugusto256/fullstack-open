import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer as anecdoteReducer } from './reducers/anecdoteReducer'
import { reducer as NotificationReducer } from './reducers/notificationReducer';
import { reducer as FilterReducer } from './reducers/filterReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: NotificationReducer,
  filter: FilterReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store;