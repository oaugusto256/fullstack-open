import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { noteReducer } from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'

import Notes from './components/Notes';
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

const App = () => {
  return (
    <>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </>
  )
}

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'))
}

renderApp();

store.subscribe(renderApp)
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})