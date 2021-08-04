import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.glog = (variable, text = null) => {
  if (text) {
    console.groupCollapsed(`%c${text}`, 'background: #222; color: #bada55')
  } else {
    console.groupCollapsed(`%cGrouped Log`, 'background: #222; color: #bada55')
  }
  console.log(variable);
  console.groupCollapsed('Trace');
  console.trace()
  console.groupEnd()
  console.groupEnd()
}

window.code = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
