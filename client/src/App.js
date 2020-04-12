import React from 'react';
import logo from './logo.svg';
import './App.css';
import {component} from 'react';
import {BrowserRouter} from 'react-router-dom'

import { ConfigureStore } from './redux/configureStore';
import Mainc from './components/Mainc'
import {Provider} from 'react-redux'
const store = ConfigureStore();

function App() {
  return (
    
    <Provider store={store}>
    <BrowserRouter>
      <div id="parent">
        <Mainc />
      </div>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;
