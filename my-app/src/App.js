import React, { Component } from 'react';
import logo from './logo.png';
import queryString from 'query-string';
import './App.css';


class NewPlaylist extends Component {
  render(){
    return (
      <div className="card">
        <img className="card-img-top" src=".../100px180/?text=Album img" alt="Playlist" />
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item" value="Item 1"/>
          </ul>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      artist: '',
      artistArray: [],
      apiData: {},
      onClick : (e) => {

      },
    };
    this.getAccessToken = this.getAccessToken.bind(this)
    this.handleArtist = this.handleArtist.bind(this)
    this.searchArtist = this.searchArtist.bind(this)
    this.buildPlaylist = this.buildPlaylist.bind(this)
  }

  componentDidMount() {
    /*
      GET an acces token from the OAuth server to login an user otherwise
      will return to the home LogIn section  
    */
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

    //NEEDS TO CHANGE SCOPE IN THE SERVER SIDE
    /* fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => console.log(data))
     */

  }

  /*
      SET an acces token for the OAuth server
  */
  getAccessToken(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    return accessToken
  }

  /*
    This Method will build a new playlist generated 
    by random tracks from user artist search
  */
  buildPlaylist(e){
    e.preventDefault()
    this.searchArtist()
  }

  /*
    This Method will collect an artist ID wish help to find albums
    and build a suggestion playlist
  */
  searchArtist(){
    /* var str = this.state.artist
    var myArray = str.split(" ")
    split.forEach((element, i) => {
      this.setState.artistArray[i] = element
    }); */ 
    let accessToken = this.getAccessToken()
    fetch('https://api.spotify.com/v1/search?q='+this.state.artist+'&type=artist', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      id : data.artists.items[0].id
      /* img: data.artists.items[0].images[2].url */
    }))
    
  }

  /*
    This Method will handle the inputs value
  */
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
                  <button onClick={ this.buildPlaylist } className="btn btn-success ml-2">Build Playlist</button>
                </form>
                <div className="card mt-5">
                  <div className="card-body mycard">
                    <p>You are currently looking for : {this.state.id}</p>
                    <img src={ this.state.img }/>
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
