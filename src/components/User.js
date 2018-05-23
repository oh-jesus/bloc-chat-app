import React, { Component } from 'react' ;

class User extends Component {

  constructor(props) {
    super(props);

     this.signIn = this.signIn.bind(this);
     this.signOut = this.signOut.bind(this);
     this.userRef = this.props.firebase.database().ref('user');
  }


  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    let userName = "Guest";
if (this.props.user) {
  userName = this.props.user.displayName;
}
console.log(this.props.user);
    return(
      <section>
        <span>{userName}
        </span>
  			  <button onClick = {this.signIn}>sign in
  			  </button>
  			</section>
    )
  }
}

export default User;
