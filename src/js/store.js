
import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import reducer from './redux'

export default state => {

  const middleware = []

  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
    middleware.push(createLogger())
  }

  return createStore(
    reducer,
    state,
    applyMiddleware(...middleware)
  )
}
