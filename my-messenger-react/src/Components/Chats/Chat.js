import React from 'react';
import {Get} from 'react-axios'
import axios from 'axios';
import {API_CHATS} from './helper.js';
import {API_DELETE_CHAT, API_SEND_MESSAGE} from "./helper";

import "./Chat.css";

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: API_CHATS + "/" + props.chatId,
            message: ''
        };
        this.updateMessage = this.updateMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteChat = this.handleDeleteChat.bind(this);
    }

    render() {
        return (
            <div className="chat">
                <a href="/"><button className="chat-delete-button" onClick={this.handleDeleteChat}>Delete Chat</button></a>
                <Get url={this.state.url} config={{withCredentials: true}}>
                    {(error, response, isLoading) => {
                        if(error) {
                            return (<div>Something bad happened: {error.message}</div>)
                        }
                        else if(isLoading) {
                            return (<div>Loading...</div>)
                        }
                        else if(response !== null) {
                            if (response.data.error) {
                                return <div>{response.data.error}</div>;
                            }
                            let messages = response.data.messages;
                            messages = JSON.parse(messages);
                            messages = messages.map(message => JSON.parse(message));
                            return messages.map(message =>

                                    <div className="chat-message">{message.date} {message.username}: {message.message}</div>

                            );
                        }
                        return <div>Something bad happened</div>;
                    }}
                </Get>
                <form className="chat-send-input" onSubmit={this.handleClick}>
                    <input className="chat-send-input-field" type="text" value={this.state.message} onChange={this.updateMessage}></input>
                    <a href="/"><input className="chat-send-input-button" type="submit" value="Send"/></a>
                </form>
            </div>
        )
    }

    handleClick() {
        console.log(this.state.message);
        let data = new FormData();
        data.append('message', this.state.message);
        const url = API_SEND_MESSAGE(this.props.chatId);
        axios({
            method: 'post',
            url: url,
            data: data,
            withCredentials: true
        }).then(function (response) {
            console.log(response.data);
        });
    }

    updateMessage(event) {
        this.setState({message: event.target.value});
    }

    handleDeleteChat() {
        const delete_api = API_DELETE_CHAT(this.props.chatId);
        axios({
            method: 'delete',
            url: delete_api,
            withCredentials: true
        }).then(function (response) {
            if (response.data.success) {
                console.log("success");
            }
        });
    }
}