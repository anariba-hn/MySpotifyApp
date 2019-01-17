import React, { Component } from 'react';
import logo from './logo.png';
import queryString from 'query-string';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      apiData: {}
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))
  }

  render() {
    return (
      <div className="App">
        { this.state.user ?
            <div>     
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" style={{width: 80, height: 80}}/>
                <h1> Welcome back {this.state.user.name} </h1>
                <form className="form-inline">
                  <div className="form-group mt-2 mb-2">
                    <input type="text" id="search" placeholder="Insert some artist" />
                  </div>
                  <button className="btn btn-success ml-2">Build Playlist</button>
                </form>
            </header>
            
            </div>   
            :
            <div>     
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
        } 
        </div>
    );
  }
}

export default App;
