import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

if (document.getElementById('react-app')) {
	ReactDOM.render(<App />, document.getElementById('react-app'));
}
