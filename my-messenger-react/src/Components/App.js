import React from 'react';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import ChatContainer from "./Chats/ChatContainer";
import Chat from "./Chats/Chat";
import ChatCreator from "./Chats/ChatCreator";

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={ChatContainer}/>
                <Route path="/create_chat" component={ChatCreator}/>
                <Route path={`/chat/:chatId`} component={SpecChat}/>
            </div>
        </Router>
    );
};

const SpecChat = ({ match }) => {
    return (<Chat chatId={match.params.chatId}/>);
};

export default App;

