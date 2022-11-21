import React from 'react';
import logo from './logo.svg';
import Login from './components/Login';
import { Main } from './Main';

// Styles
import './style/AppStyle.css'
import './style/RoleThemes.css'

function App() {
  return (
      <div className="admin-theme">
        <Main/>
      </div>
  );
}

export default App;
