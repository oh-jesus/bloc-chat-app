import React, { Component } from 'react' ;

class MessageList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      messages: [{
        username:'',
        constent:'',
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
      this.setState({ messages: this.setState.messages.concat( message ) })
    });

  }
  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages.filter(message => message.roomId === activeRoom)
        .map(message => {
          return <div key={message.key}>{message.content}</div>
        })

        return (
          <div className='chats'>
            <ul>{messageList}</ul>
          </div>
        );
      }

    }

export default MessageList;
