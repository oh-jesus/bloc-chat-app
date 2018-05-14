import React, { Component } from 'react' ;

class Roomlist extends Component {

  constructor (props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    this.setState({newRoomName: e.target.value})
  }

  createRoom(e) {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({newRoomName:''});
  }

  render(){
    return (
      <div>
        <ul>
         {this.state.rooms.map((room, index) => {
           return(
            <li key={index}>{room.name}</li>)
         })}
       </ul>
       <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) }}>
         <input type="text" name="newRoomName"  value = {this.state.newRoomName} onChange = {this.handleChange.bind(this)}/>
         <input type="submit" value="add new room" />
        </form>
     </div>
   );
  }
}

export default Roomlist;
