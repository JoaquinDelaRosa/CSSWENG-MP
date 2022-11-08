import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { Main } from './Main';
import Navbar from "./components/Navbar"

function App() {
  return (
      <div >
          <header >
                <Navbar/>
                <Main/>
          </header>
      </div>
  );
}

export default App;
