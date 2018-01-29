import React from 'react';
import axios from 'axios';
import "./LoginForm.css";
import RegistrationForm from "./RegistrationForm";
import {API_LOGIN} from "../Chats/helper";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    updateUsername(event) {
        this.setState({username: event.target.value});
    }

    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    handleClick(event) {
        let data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);
        axios({
            method: 'post',
            url: API_LOGIN,
            data: data,
            withCredentials: true
        }).then(function (response) {
            if (response.data.success) {
                console.log("success");
            }
        });
    };

    render() {
        return (
            <div className="auth-container" >
                <form className="login-form" onSubmit={this.handleClick}>
                    <input type="text" placeholder="Login" value={this.state.username} onChange={this.updateUsername}/>
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.updatePassword}/>
                    <a href="/"><input className="login-form-button" type="submit" value="Login"/></a>
                </form>
                <RegistrationForm/>
            </div>
        )
    }
}