import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const createAnecdote = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

const vote = (anecdote) => {
  return async dispatch => {
    const anecdoteUpdated = { ...anecdote, votes: anecdote.votes + 1 };
    const data = await anecdoteService.update(anecdoteUpdated);

    dispatch({
      type: 'VOTE',
      data: { id: data.id }
    });
  }
}

export {
  reducer,
  vote,
  createAnecdote,
  initializeAnecdotes,
};