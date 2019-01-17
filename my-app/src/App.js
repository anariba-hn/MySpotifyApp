import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" style={{width: 80, height: 80}}/>
          <p>
            My Spotify Suggestion Music Tool 
          </p>
          <button className="btn btn-success mt-3" onClick={()=> window.location='http://localhost:8888/login'}>
            Log In with your account
          </button>
        </header>
      </div>
    );
  }
}

export default App;
