/*global chrome*/
import React, { Component } from 'react';

class StartPage extends Component {
	constructor(props) {
		super(props);

		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		console.log('Starting task: ' + this.state.value + ' at ' + new Date());
	    chrome.runtime.sendMessage({type: 'TASK_STARTED', taskName: this.state.value}, function(response){
	      console.log("Background page response: " + JSON.stringify(response));
	    });
		this.props.onTaskStart(this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="uk-form uk-form-stacked StartPage">
				<div className="uk-form-row">
					<label className="uk-text-large start-page-task-name">
						Task Name: 
					</label>
					<input type="text" value={this.state.value} 
					onChange={this.handleChange} placeholder="e.g. History Paper 1..."
					autoFocus className="uk-form-width-medium" />
				</div>
				
				<div className="uk-form-row">
					<input type="submit" value="START" className="uk-button uk-button-large uk-button-primary" />
				</div>
			</form>
		)
	}
}

export default StartPage;