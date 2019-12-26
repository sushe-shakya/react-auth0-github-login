import React , {Component} from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Github from './Github';
import Header from './Components/Header';
import Auth0Lock from 'auth0-lock';

class App extends Component {

  static defaultProps = {
    clientId:'cPpy1ypm8Bb3v0oLLXge0G4L569OcWsC',
    domain:'dev-ntrsgei1.auth0.com'
  }

  constructor(props){
    super(props);

    this.state = {
      accessToken:'',
      profile:{}
    };
    this.showLock = this.showLock.bind(this);
    this.logout = this.logout.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
    this.lock.on('authenticated',(authResult)=>{
      console.log(authResult);
      this.lock.getProfile(authResult.accessToken, (error,profile)=>{
        if(error){
          console.log(error);
          return;
        }
        else if(profile){
          this.setProfile(authResult.accessToken, profile);
        }
      });
    });

    this.getProfile();
  }

  setProfile(accessToken, profile){
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('profile',JSON.stringify(profile));
    this.setState({accessToken:localStorage.getItem('accessToken'), profile:JSON.parse(localStorage.getItem('profile'))});
  }
  showLock(){
    this.lock.show();
  }

  logout(){
    this.setState({accessToken:'',profile:''});
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
  }

  getProfile(){
    if(localStorage.getItem('accessToken')!=null){
      this.setState({accessToken:localStorage.getItem('accessToken'),
        profile:JSON.parse(localStorage.getItem('profile'))},
    ()=>{console.log(this.state)});

    }

  }
  render(){
    let gitFlag;
    if(this.state.accessToken){
      gitFlag =<Github/>
    }
    else{
      gitFlag = "Login for Github Viewer"
    }
  return (
    <div className="App">
      <Header
        lock={this.lock}
        accessToken={this.state.accessToken}
        onLogin={this.showLock}
        onLogout={this.logout}/>
      {gitFlag}
    </div>
  );}
}

export default App;
