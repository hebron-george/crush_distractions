/*global chrome*/
import React, { Component } from 'react';

class DonePage extends Component {
	constructor(props) {
		super(props);

		this.state = {lastDistraction: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOtherChange = this.handleOtherChange.bind(this);
	}

	handleChange(event) {
		event.preventDefault();
		var distraction = '';
		event.target.value === "other" ? 
		(distraction = this.state.otherDistraction) :
		(distraction = event.target.value);
		console.log("Distracted by: " + distraction + " at " + new Date());
		this.setState({lastDistraction: event.target.value})
	}

	handleOtherChange(event) {
		event.preventDefault();
		this.setState({otherDistraction: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("Completed task: " + this.props.taskName + " at " + new Date());
		chrome.runtime.sendMessage({
			type: 'TASK_STOPPED'
		})
		this.props.onTaskStop();
	}

	render() {
		return (
			<div>
				<form className="DonePageTop uk-form" onSubmit={this.handleChange} >
					<h3 className="uk-form-row">Got distracted?</h3>

					<button className="uk-button uk-button-large" 
					value="Email" onClick={this.handleChange}>Email</button>

					<button className="uk-button uk-button-large" 
					value="Facebook" onClick={this.handleChange}>Facebook</button>

					<button className="uk-button uk-button-large" 
					value="Reddit" onClick={this.handleChange}>Reddit</button>

					<button className="uk-button uk-button-large" 
					value="Netflix" onClick={this.handleChange}>Netflix</button>

					<button className="uk-button uk-button-large" 
					value="YouTube" onClick={this.handleChange}>YouTube</button>

					<div className="uk-form-row other-distraction-box">
						<input type="text" placeholder="Other..." 
						className="uk-form-width-medium uk-form-row"
						onChange={this.handleOtherChange} />

						<button className="uk-button uk-button-medium uk-button-primary"
						value="other" onClick={this.handleChange}>Submit</button>
					</div>
				</form>
				<form className="DonePageBottom uk-form" onSubmit={this.handleSubmit} >
					<h2 className="uk-form-row">Completed '{this.props.taskName}'?</h2>
					<input type="submit" value="WOOHOO! DONE!" className="DoneButton uk-button uk-button-large uk-button-success" />
				</form>
			</div>
		)
	}
}

export default DonePage;