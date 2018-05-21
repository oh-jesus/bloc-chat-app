import React, { Component } from 'react' ;

class User extends Component {

  constructor(props) {
    super(props);

     this.signInWithPopup = this.signInWithPopup.bind(this);
     this.signOut = this.signOut.bind(this);

     this.userRef = this.props.firebase.database().ref('user');
  }


  signInWithPopup() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopUp( provider );
  }
  signOut() {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {
    return(
      <section>
  			  <button onClick = {this.signInWithPopup}>sign in
  			  </button>
  			  <span>{this.props.user}
  			  </span>
  			</section>
    )
  }
}

export default User;
