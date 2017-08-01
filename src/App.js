/*global chrome*/
import React, { Component } from 'react';
import StartPage from './components/StartPage';
import DonePage from './components/DonePage';
import RegisterPage from './components/RegisterPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleStartTask = this.handleStartTask.bind(this);
    this.handleStopTask = this.handleStopTask.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleStartTask(task) {
    this.setState({task_in_progress: true, taskName: task, hasStartedTask: true});
  }

  handleStopTask() {
    this.setState({task_in_progress: false, taskName: ''});
  }

  handleRegistration(status) {
    if (status === true) {
      this.setState({hasRegistered: true});
    }
  }

  componentWillMount() {
    chrome.runtime.sendMessage({
      type: 'GET_STATE'
    }, (response) => {
      console.log("This is the initial state given: " + JSON.stringify(response.state));
      this.setState(response.state);
    });
  }

  componentWillUnmount() {

  }

  render() {
    let page = null;
    console.log("Going to access hasRegisteredin App.render()");
    if (false || !this.state.hasRegistered) {
      page = <RegisterPage onSubmit={this.handleRegistration}/>;
    } else {
      if (!this.state.hasStartedTask) {
        page = <StartPage onTaskStart={this.handleStartTask} />;
      } else {
        page = <DonePage taskName={this.state.taskName} onTaskStop={this.handleStopTask} />;
      }
    }
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
