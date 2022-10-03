import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Main } from './Main';

function App() {
  return (
      <div className="App">
          <header className="App-header">
              <Main id={1}/>
          </header>
      </div>
  );
}

export default App;
