'use strict'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
 
const middlewares = [
  thunkMiddleware,
  createLogger()
]
 console.log('middlewares', middlewares)
export default function configStore () {
  const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware,
      createLogger())
  )
  return store
}