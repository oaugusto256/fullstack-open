import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { noteReducer } from './reducers/noteReducer'

import Notes from './components/Notes';
import NewNote from './components/NewNote'


const store = createStore(noteReducer)

const App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'))
}

renderApp()

store.subscribe(renderApp)
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})