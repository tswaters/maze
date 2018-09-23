
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import * as offline  from 'offline-plugin/runtime'

import Container from './components/Container'
import configureStore from './store'

offline.install({
  onUpdateReady () { offline.applyUpdate() },
  onUpdated () { window.location.reload() }
})

const store = configureStore()

const rows = parseInt(localStorage.getItem('rows')) || 10
const cols = parseInt(localStorage.getItem('cols')) || 20

store.dispatch({
  type: 'init',
  rows,
  cols,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight
})

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
)
