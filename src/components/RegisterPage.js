/*global chrome*/
import React, { Component } from 'react';

class RegisterPage extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		chrome.runtime.sendMessage(
		{
			type: 'REGISTRATION',
			email: event.target.value
		}, (response) => {
			console.log(JSON.stringify(response));
			this.props.onSubmit(response.code === 200 ? true : false);
		})
		event.preventDefault();
	}

	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit} 
				className="uk-form uk-form-stacked StartPage">
				
					<div className="uk-form-row">
						<h2>Let's get started!</h2>
						<input type="text"
						placeholder="my.email@example.com"
						className="uk-form-width-medium" />
					</div>
				
					<div className="uk-form-row">
						<input type="submit" value="GET STARTED"
						className="uk-button uk-button-large uk-button-primary" />
					</div>
				
				</form>
			</div>
		)
	}
}

export default RegisterPage;