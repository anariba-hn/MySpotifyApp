import React, { Component } from 'react';
import logo from './logo.png';
import queryString from 'query-string';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      artist: '',
      tracksArray: [],
      apiData: {},
      onClick : (e) => {
      },
    };
    this.getAccessToken = this.getAccessToken.bind(this)
    this.handleArtist = this.handleArtist.bind(this)
    this.searchArtist = this.searchArtist.bind(this)
    this.searchOn = this.searchOn.bind(this)
  }

  componentDidMount() {
    let accessToken = this.getAccessToken()
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(function(response) {
      if(response.ok)
        return response.json()
      else
        window.location='http://localhost:3000'
    })
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))
  }

  getAccessToken(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    return accessToken
  }

  searchOn(e){
    e.preventDefault()
    this.searchArtist()
  }

  searchArtist(){
    let accessToken = this.getAccessToken()
    fetch('https://api.spotify.com/v1/search?q='+this.state.artist+'&type=artist', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => {
        this.tracksId = data.artists.items[0].id
        this.setState({
        name : data.artists.items[0].name,
        img: data.artists.items[0].images[1].url,
        follow: data.artists.items[0].followers.total
      })
      console.log(data)
    })
  }

 handleArtist(e){
    e.preventDefault()
    this.setState({
      artist : e.target.value
    })
    console.log(this.state.artist)
  }

  render() {
    return (
      <div className="App">
        { this.state.user ?
            <div>     
            <header className="App-header">
              <img src={ logo } className="App-logo" alt="logo"/>
                <h1> Welcome back { this.state.user.name } </h1>
                <form className="form-inline">
                  <div className="form-group mt-2 mb-2">
                    <input type="text" name="artist" placeholder="Insert some artist" onChange = { this.handleArtist }/>
                  </div>
                  <button onClick={ this.searchOn } className="btn btn-success ml-2">Search</button>
                </form>
                <div className="card mt-5">
                  <div className="card-body mycard">
                    <p>You are currently looking for : {this.state.name}</p>
                    <img src={ this.state.img } />
                    { this.state.follow ?
                    <p>Fallowers: {this.state.follow}</p>
                    :
                    <p></p>
                    }
                  </div>
                </div>
            </header>
            </div>   
            : 
            <div>     
              <header className="App-header">
                <img src={ logo } className="App-logo" alt="logo"/>
                <p>
                  My Spotify Suggestion Music Tool 
                </p>
                <button className="btn btn-success mt-3" onClick={ () => window.location='http://localhost:8888/login' }>
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
