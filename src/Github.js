import React, {Component} from 'react';
import Profile from './Components/Profile';
import Search from './Components/Search';

const API = "https://api.github.com/users";

class Github extends Component {

  constructor(props){
    super(props);

    this.state = {
      username:'',
      name:'',
      avatar:'',
      repos:'',
      followers:'',
      following:'',
      homeURL:'',
      submitted:''
    };
    this.getGithubProfile = this.getGithubProfile.bind(this);
    this.setSubmit = this.setSubmit.bind(this);
  }
  componentDidMount(){
      this.getGithubProfile(this.state.username);
  }

  getGithubProfile(username){
    let finalURL=`${API}/${username}`;
    fetch(finalURL)
    .then(res=>res.json())
    .then((data)=>{
      this.setState({
            username:data.login,
            name:data.name,
            avatar:data.avatar_url,
            repos:data.public_repos,
            followers:data.followers,
            following:data.following,
            homeURL:data.html_url,
            message:data.message})
    })
    .catch(e=>{console.log(e)});
  }
  setSubmit(){
    this.setState({submitted:true});
  }
  render(){
    var profile;
    if (this.state.submitted){
      profile = <Profile userData={this.state}/>;
    }
    else{
      profile = <div className="github-profile-info">Your profile will show up here</div>

    }
    return(
      <div>
        <section id="card">
          <Search searchProfile={this.getGithubProfile} setSubmit={this.setSubmit}/>
          {profile}
      </section>
      </div>
    );
  }
}

export default Github;
