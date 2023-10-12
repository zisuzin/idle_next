import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ts/store'; // Import your Redux store
import App from './app'; 

ReactDOM.render(<App />, document.getElementById("root"));