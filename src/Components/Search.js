import React, {Component} from 'react';

class Search extends Component {
  submit(event){
    event.preventDefault();
    let value = this.refs.username.value;
    this.props.setSubmit();
    this.props.searchProfile(value);
    this.refs.username.value='';
  }
  constructor(props){
    super(props);

    this.state = {};
    this.submit = this.submit.bind(this);
  }
  render(){
    return(
      <div className="search-box">
      <form onSubmit={this.submit}>
        <label>
        <input type="search" ref="username" placeholder="type username and enter"/>
        </label>
      </form>
      </div>
    );
  }
}

export default Search;
