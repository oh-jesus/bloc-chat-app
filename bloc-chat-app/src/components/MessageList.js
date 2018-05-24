import React, { Component } from 'react' ;
import './MessageList.css'

class MessageList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      messages: [{
        username:'',
        content:'',
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId:''
      }],
      message: ''
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount () {
    this.messagesRef.on('child_added',snapshot => {
      let message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });

  }
  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages.filter(message => message.roomId === activeRoom.key)
        .map(message => {
          return <div key={message.key}>
            <ul>
            <li>'{message.content}'</li>
            <li>sent at-{message.sentAt} from-{message.userName}</li>
            </ul>
          </div>
        })
        return (
          <div className="chats">
            {messageList}
          </div>
        );
      }

    }

export default MessageList;
