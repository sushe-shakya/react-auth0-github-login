import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class Header extends Component {

  onLogin(){
    this.props.onLogin();
  }

  onLogout(){
    this.props.onLogout();
  }
  constructor(props){
    super(props);

    this.state = {};
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  render(){
    let text,func ;
    if(this.props.accessToken){
      func=this.onLogout;
      text = "Logout";
    }
    else{
      func=this.onLogin;
      text = "Login";
    }
    return(
      <Navbar>

        <Navbar.Brand>
          Github Searcher
        </Navbar.Brand>

        <Nav>
          <Nav.Link onClick={func} href="#">{text}</Nav.Link>
        </Nav>

      </Navbar>
    );
  }
}

export default Header;
