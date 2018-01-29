import React from 'react';
import axios from 'axios';

import "./RegistrationForm.css";
import {API_REGISTRATION} from "../Chats/helper";

export default class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: ''
        };
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateConfirm = this.updateConfirm.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    updateUsername(event) {
        this.setState({username: event.target.value});
    }

    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    updateConfirm(event) {
        this.setState({confirm: event.target.value});
    }

    handleClick(event) {
        if(this.state.username.length > 1
            && this.state.password.length > 7
            && this.state.password === this.state.confirm) {

            let data = new FormData();
            data.append('username', this.state.username);
            data.append('password', this.state.password);

            axios({
                method: 'post',
                url: API_REGISTRATION,
                data: data
            }).then(function (response) {
                if (response.data.success) {
                    alert("Success!");
                } else {
                    alert("unsuccessful :(");
                }
            });
        }
        event.preventDefault();
    };

    render() {
        return (
            <form className="registration_form" onSubmit={this.handleClick}>
                <input type="text" placeholder="Login" value={this.state.username} onChange={this.updateUsername}/>
                <input type="password" placeholder="Password" value={this.state.password} onChange={this.updatePassword}/>
                <input type="password" placeholder="Confirm password" value={this.state.confirm} onChange={this.updateConfirm}/>
                <input type="submit" value="Sign Up"/>
            </form>
        )
    }
}