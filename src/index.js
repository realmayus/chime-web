import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {createStore} from "redux"
import {Provider} from "react-redux"

import {
    BrowserRouter as Router
} from "react-router-dom"
import loginReducer from "./redux/reducers"

export const store = createStore(
    loginReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)



ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <App/>
          </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
