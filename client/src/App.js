import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import AppLayout from './layout'
import './App.css';
import 'antd/dist/antd.css'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppLayout/>
      </Provider>
    );
  }
}

export default App;
