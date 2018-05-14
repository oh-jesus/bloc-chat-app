import React, { Component } from 'react' ;

class MessageList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      messages: [{
        username:'',
        constent:'',
        sentat: firebase.database.ServerValue.TIMESTAMP,
        roomId:''
      }],
      message: ''
    }
    this.messagesRef = this.props.database().ref('messages');
  }

  componentDidMount () {
    this.messagesRef.on('child_added',snapshot => {
      let message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.setState.messages.concat( message ) })
    });

  }
  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages.filter(message => message.roomId === activeRoom)
        .map(message => {
          return <li key={message.key}>{message.content}</li>
        })

        return (
          <div className='chats'>
            <ul>{messageList}</ul>
          </div>
        );
      }

    }

export default MessageList;
