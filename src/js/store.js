
import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import reducer from './redux'

export default state => {

  const middleware = []

  const logger = createLogger({
    diff: true,
    aggregate: typeof window === 'undefined'
  })

  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
    middleware.push(logger)
  }

  return createStore(
    reducer,
    state,
    applyMiddleware(...middleware)
  )
}
