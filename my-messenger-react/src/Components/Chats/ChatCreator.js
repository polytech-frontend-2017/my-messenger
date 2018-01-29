import React from 'react';
import {Get} from 'react-axios';
import axios from "axios/index";
import {API_CHATS, API_USERS} from "./helper";
import "./ChatCreator.css";

export default class ChatCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.handleCreateChat = this.handleCreateChat.bind(this);
        this.updateCheckboxes = this.updateCheckboxes.bind(this);
    }

    handleCreateChat() {
        let data = new FormData();
        data.append('users', JSON.stringify(this.state.users));
        console.log(this.state.users);
        axios({
            method: 'post',
            url: API_CHATS,
            data: data,
            withCredentials: true
        }).then(function (response) {
            if (response.data.success) {
                console.log("success");
            }
            console.log(response.data);
        });
    }

    updateCheckboxes(event) {
        if (event.target.checked) {
            let users = this.state.users;
            users.push(event.target.id);
            this.setState({users: users});
            console.log(users);
        } else {
            let users = this.state.users;
            const index = users.indexOf(event.target.id);
            users.splice(index);
            this.setState({users: users});
            console.log(users);
        }
    }

    render() {
        return (
            <div className="create-chat-form">
            <Get url={API_USERS} config={{withCredentials: true}}>
                {(error, response, isLoading) => {
                    if(error) {
                        return (<div>Something bad happened: {error.message}</div>)
                    }
                    else if(isLoading) {
                        return (<div>Loading...</div>)
                    }
                    else if(response !== null) {
                        const users = response.data;
                        let html_checkboxes_users =
                            users.map(username =>
                                <div>
                                    <input onClick={this.updateCheckboxes} type="checkbox" id={username}/>
                                    <label for={username}>{username}</label>
                                </div>);
                        return(
                            <div>
                                <div>{html_checkboxes_users}</div>
                                <a href="/"><button onClick={this.handleCreateChat}>Create Chat</button></a>
                            </div>);
                    }
                    return <div>Something bad happened</div>;
                }}
            </Get>
            </div>
        );
    }

}