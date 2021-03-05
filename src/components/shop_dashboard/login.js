import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user: '',
      pass: ''
    }
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    })
  }
  onChangePass(e) {
    this.setState({
      pass: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const credentials = {
      user: this.state.user,
      pass: this.state.pass
    }

    axios.get('http://localhost:5000/login/', { params: credentials })
      .then(res => console.log(res.data));
  }

  render(){
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <label>Username</label>
          <input type="text" value={this.state.user} onChange={this.onChangeUser}/>
          <label>Password</label>
          <input type="text" value={this.state.pass} onChange={this.onChangePass}/>
          <input type="submit" value="Log In"/>
        </form>
      </>
    );
  }
}