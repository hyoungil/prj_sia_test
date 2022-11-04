import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'


import reducer from "./modules/_reducers";

// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   reduxThunk
// )(createStore);
// createRoot(document.getElementById('root')).render(
//   <Provider store={createStoreWithMiddleware(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()
//   )}>
//     <App />
//   </Provider>,
// )


const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
      <App />
    </Provider>
  </React.StrictMode>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

