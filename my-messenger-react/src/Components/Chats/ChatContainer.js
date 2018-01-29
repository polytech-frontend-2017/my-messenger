import React from 'react';
import {Get} from 'react-axios';
import LoginForm from "../Forms/LoginForm";
import axios from "axios";

import "./ChatContainer.css";
import {API_CHAT_USERS, API_CHATS, API_LOGOUT} from "./helper";

export default class ChatContainer extends React.Component {

    handleLogout = () => {
        console.log(this);
        axios({
            method: 'get',
            url: API_LOGOUT,
            withCredentials: true
        }).then(function (response) {
            console.log(response);
        });
    };

    render() {
        return(
            <Get url={API_CHATS} config={{withCredentials: true}}>
                {(error, response, isLoading) => {
                    if(error) {
                        return (<div>Something bad happened: {error.message}</div>)
                    }
                    else if(isLoading) {
                        return (<div>Loading...</div>)
                    }
                    else if(response !== null) {
                        console.log(response);
                        if (!response.data.success) {
                            return <LoginForm/>;
                        }
                        const chats = response.data.chats;
                        return <div className="container">
                            {chats.map(chatId => {
                                    let urlChat = "chat/" + chatId;
                                    console.log(urlChat);
                                    return (
                                        <div className="chat-container">
                                            <a className="chat-container-users" href={urlChat}>
                                                <Get url={API_CHAT_USERS(chatId)} config={{withCredentials: true}}>
                                                    {(error, response) => {
                                                        if (error) {
                                                            return (<div>Something bad happened: {error.message}</div>)
                                                        } else if (response !== null) {
                                                            const users = response.data.users + "";
                                                            return <div>{users}</div>;
                                                        }
                                                        return <div>Something bad happened</div>
                                                    }}
                                                </Get>
                                            </a>
                                        </div>);
                                }
                            )}
                            <a href="/create_chat"><button>Add Chat</button></a>
                            <a href="/"><button onClick={this.handleLogout}>Logout</button></a>
                        </div>
                    }
                    return <div>Something bad happened</div>;
                }}
            </Get>
        )
    }
}