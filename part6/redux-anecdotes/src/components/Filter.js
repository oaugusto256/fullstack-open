import React from 'react'

import { useDispatch } from 'react-redux'
import { filterBy } from '../reducers/filterReducer';


const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(filterBy(event.target.value))
  }

  return (
    <p>
      filter <input onChange={handleChange} name="filter" />
    </p>
  )
}

export default Filter
