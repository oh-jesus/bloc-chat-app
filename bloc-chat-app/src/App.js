import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Roomlist from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyBB4WtG0Yh3PlYxL4SrdFFq1WufT4roQEc",
   authDomain: "bloc-chat-99618.firebaseapp.com",
   databaseURL: "https://bloc-chat-99618.firebaseio.com",
   projectId: "bloc-chat-99618",
   storageBucket: "bloc-chat-99618.appspot.com",
   messagingSenderId: "727346077832"
 };
 firebase.initializeApp(config);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: ''
    };
  }

setUser(user) {
  this.setState({ user: user});
}

setRoom(room) {
  this.setState({ activeRoom: room});
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <nav className="roomsList">
          <Roomlist firebase = {firebase} activeRoom ={this.setRoom.bind(this)}/>
        </nav>
        <main>
          <h2>{this.state.activeRoom.name}</h2>
          <MessageList className="chatRoom" firebase = {firebase} activeRoom = {this.state.activeRoom}/>
        </main>
      </div>
    );
  }
}

export default App;
