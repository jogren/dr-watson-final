import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Header/Header';
import WelcomeModal from '../WelcomeModal/WelcomeModal';
import ChatBox from '../ChatBox/ChatBox';
import { removeUser, hasErrored, addNewMessage, clearAllMessages } from '../../actions';
import { endConversation } from '../../apiCalls';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  addMessage = (message, isUser) => {
    const { messages } = this.props;
    this.props.addNewMessage([...messages, { message, isUser }])
    // this.setState({ messages: [...messages, { message, isUser }]});
  }

  clearMessages = () => {
    this.props.clearAllMessages([])
    // this.setState({ messages: [] });
  }

  signOut = async () => {
    try {
      await endConversation();
      this.props.removeUser();
      this.clearMessages();
    } catch({ message }) {
      this.props.hasErrored(message);
    }
  }

  render() {
    const { user, messages } = this.props;
    // const { messages } = this.state;
    console.log(messages)
    return (
      <div className="App">
        <Header signOut={this.signOut} />
        {!user && <WelcomeModal addMessage={this.addMessage} />}
        {user && <ChatBox addMessage={this.addMessage} messages={messages} />}
      </div>
    );
  }
}

export const mapStateToProps = ({ user, messages }) => ({
  user,
  messages
});

export const mapDispatchToProps = dispatch => bindActionCreators({ removeUser, hasErrored, addNewMessage, clearAllMessages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
