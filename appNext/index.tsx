import React from 'react'
import { render, hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import { store } from './utils/store'
import { hot } from 'react-hot-loader/root'
import { App } from './App'

let renderer = DEVELOPMENT ? render : hydrate

const AppInstance: React.FC = props => <App store={store} />

const Application = hot(AppInstance)

loadableReady(async () => {
  renderer(<Application />, document.getElementById('app-root'))
})
