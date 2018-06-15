import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'animate.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'vis/dist/vis.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
