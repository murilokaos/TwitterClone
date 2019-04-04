import React, { Component } from 'react';
import api from '../services/api';

import './Login.css';
import twitterLogo from '../twitter.svg'

export default class Login extends Component {
    state = {
      email: '',
      password: ''
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;
        
        
        if(!email && !password) return;

        const login = await api.post('user/login', {
          email,
          password
        })

        if(login.data){
            await localStorage.setItem('@GoTwitter:account', JSON.stringify(login.data));
            this.props.history.push('/timeline');
        }
    };

    handleUsernameChange = e => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = e => {
      this.setState({ password: e.target.value });
    };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="GoTwitter" />
        <form onSubmit={this.handleSubmit}>
            <input 
                value={this.state.email}
                onChange={this.handleUsernameChange}
                placeholder="Nome de Usuário"
            />
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Senha" />
            <button type="submit">Entrar</button>
        </form>
      </div>
    )
  };
}
