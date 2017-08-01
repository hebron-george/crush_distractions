// Check whether new version is installed
app_state = {};

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("Fresh install, setting up initial app state");
        app_state = {
        	task_in_progress: false,
        	hasRegistered: false,
        	hasStartedTask: false
        }
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Message received in background page: " + JSON.stringify(request));

    switch(request.type){
    	case 'REGISTRATION':
    		app_state.hasRegistered= true;
    		sendResponse({
    			code: 200,
    			message: "Registration successful!"
    		});
    		break;
    	case 'GET_STATE':
    		console.log("Sending app_state: " + JSON.stringify(app_state));
    		sendResponse({state: app_state});
    		break;
    	case 'TASK_STARTED':
    		app_state.taskName = request.taskName;
    		sendResponse({
    			code: 200,
    			message: "Starting task: " + request.taskName
    		});
    		break;
    	case 'TASK_STOPPED':
    		app_state.hasStartedTask = false;
    		app_state.taskName = '';
    		sendResponse({
    			code: 200,
    			message: "Stopped task: " + app_state.taskName
    		});
    		break;
    	default:
    		sendResponse({
    			code: 400,
    			message: "Bad request"
    		});
    }
  }
);