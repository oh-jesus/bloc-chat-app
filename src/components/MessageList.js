import React, { Component } from 'react' ;

class MessageList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      messages: [{
        username:'',
        content:'',
        sentat: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId:''
      }],
      message: ''
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount () {
    this.messagesRef.on('child_added',snapshot => {
      let message = snapshot.val();
      console.log(message);
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
      console.log(this.state.messages);
    });

  }
  render() {
        return (
         <ul>
          {this.state.messages.map( message =>
            <li>{message}</li>
           </ul>
        );
      }

    }

export default MessageList;
