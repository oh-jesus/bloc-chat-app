import React, { Component } from 'react' ;
import './MessageList.css'

class MessageList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      messages: [{
        userName:'',
        content:'',
        sentAt: '',
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
    handleChange(e) {
      this.setState({message: e.target.value});
    }

    createMessage (e) {
      this.messagesRef.push({
        content: this.state.message,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        userName: this.props.user.displayName,
        roomId: this.props.activeRoom.key,
      });
      this.setState({message: ''});
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
          <section>
           <div className="chats">
             {messageList}
           </div>
           <form onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.message) }}>
             <input type="text" name="message" value= {this.state.message} onChange= {this.handleChange.bind(this)}/>
             <input type="submit" value="send"/>
           </form>
         </section>
        );
      }

    }

export default MessageList;
