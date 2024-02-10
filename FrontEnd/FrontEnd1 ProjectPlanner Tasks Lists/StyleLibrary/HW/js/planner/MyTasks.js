<style type="text/css">
/*
------------------
Settings
------------------
Client: Acme
Used in: Tasks script editor
Template: n/a
Custom name: UI_Tasks.css

 
*/
.wizdom-myTasks {
    padding: 0 30px;
}

.wizdom-myTasks>div>.row {
    border-bottom: 1px solid #ccc;
    margin-left: 0;
    margin-right: 0;
    margin: 0 0 20px 0;
}

.wizdom-myTasks p {
    margin: 7px 0 0;
}

.wizdom-myTasks p:first-child {
    margin-top: 0;
}

.wizdom-myTasksImage {
    display: table-cell;
    vertical-align: top;
}

.wizdom-myTasksImage .taskStatus {
    width: 20px;
    height: 20px;
    background: url(https://cfcloud.sharepoint.com/Sites/WizdomDemo/SiteAssets/Images/task-undone.png);
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    transition: 0.6s ease-in all;
}

.wizdom-myTasksImage .taskStatus.done {
    width: 20px;
    height: 20px;
    background: url(https://cfcloud.sharepoint.com/Sites/WizdomDemo/SiteAssets/Images/task-done.png)
}

.wizdom-myTasksImage img.small {
    max-width: 140px;
}

.wizdom-myTasksContent {
    position: relative;
    display: table-cell;
    vertical-align: top;
    padding: 20px 20px 15px;
    padding-top: 0;
}

.wizdom-myTasksContent p.text {
    WORD-WRAP: BREAK-WORD;
    OVERFLOW: HIDDEN;
    margin: 0 0 15px 0;
}

.wizdom-myTasksContent .btn:hover {
    background: none !important;
}
 

.wizdom-myTasksContent .date {
    font-weight: 500;
    margin: 0;
}

.wizdom-myTasksContent .info {
    color: #999;
    display: inline-block;
    font-size: 14px;
    padding: 0;
    margin: 0 0 15px 0;
}

.wizdom-myTasksContent .text {
    color: #005b8e;
    font-size: 18px;
    line-height: 20px !important;
    font-weight: 500;
    width: auto;
    height: auto;
    border: 0;
    font-family: 'Montserrat', sans-serif;
    padding: 0;
}

.wizdom-myTasksContent .text.done a {
    text-decoration: line-through;
    color: #000;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.wizdom-myTasksContent .favourites {
    margin-top: 10px;
}

.wizdom-myTasksContent .favourite {
    transition: 0.3s ease-in all;
    font-size: 14px;
    background: url(https://cfcloud.sharepoint.com/Sites/WizdomDemo/SiteAssets/Images/fav-inactive.png) no-repeat;
    color: #000;
    padding-left: 20px;
    margin-right: 10px;
}

.wizdom-myTasksContent .favourite:hover,
.wizdom-myTasksContent .favourite.active {
    background: url(https://cfcloud.sharepoint.com/Sites/WizdomDemo/SiteAssets/Images/fav-active.png) no-repeat;
    text-decoration: none
}

.wizdom-myTasksContent .invite {
    transition: 0.3s ease-in all;
    font-size: 14px;
    background: url(https://cfcloud.sharepoint.com/Sites/WizdomDemo/SiteAssets/Images/invite.png) no-repeat;
    color: #000;
    padding-left: 20px;
    background-position: left 34%;
}

.wizdom-myTasksContent .invite:hover,
.wizdom-myTasksContent .invite.active {
    background: url(https://cfcloud.sharepoint.com/Sites/WizdomDemo/SiteAssets/Images/invite-active.png) no-repeat;
    text-decoration: none;
    background-position: left 34%;
}

.wizdom-myTasksContent .text a {
    color: #1f3c69;
    font-size: 18px;
}

.wizdom-myTasksContent .comments a {
    margin-right: 15px;
}

@media all and (max-width:767px) {

    .wizdom-myTasksImage img.small,
    .wizdom-myTasksImage img {
        max-width: 130px !important;
    }
    #PlannerMenu>div>div {
        flex: 0 0 100%;
    }
}

@media all and (max-width:1199px) {
    .wizdom-myTasks {
        padding: 0;
    }

    .wizdom-myTasks>div>.row {
        margin-bottom: 25px;
        background: transparent;
        border: 0;
        background: #fff;
        padding: 15px;
    }

    .wizdom-myTasksContent {
        padding: 0 20px;
    }
    
}

</style>

<div id="my-wizdom-tasks" style="padding:0">                   
	<div class="wizdom-myTasks myWizdomButtons" style="padding:0">
	    <h2 class="wizdom-contentHeader">My tasks</h2>
        <div id="tasks-content-wrapper"></div>
            <div>
		        <a class="btn btn-primary mb" href="https://tasks.office.com/contentformula.com">See more tasks</a>
	        </div>
    </div>
</div>
 
<script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.0/js/adal.min.js"></script>

<script>
GetTasksData = function () {
"use strict";
	    // Some samples will use the tenant name here like "tenant.onmicrosoft.com"
	    // I prefer to user the subscription Id
  var subscriptionId = "cfcloud.onmicrosoft.com" /* var subscriptionId = "TENANT_OBJECT_ID" */
	    // Copy the client ID of your AAD app here once you have registered one, configured the required permissions, and
	    // allowed implicit flow https://msdn.microsoft.com/en-us/office/office365/howto/get-started-with-office-365-unified-api
  var clientId = "e269cc9e-7666-44d9-9379-4bd9d151eef2" /* var clientId = "APP_REGISTRION_ID"; => this one is the azure client ID */


  window.config = {
    subscriptionId: subscriptionId,
    clientId: clientId,
    postLogoutRedirectUri: window.location.origin,
    endpoints: {
    graphApiUri: 'https://graph.microsoft.com'
	},
	    cacheLocation: 'localStorage' // enable this for IE, as sessionStorage does not work for localhost.
	};
  var authContext = new AuthenticationContext(config);
	    // Check For & Handle Redirect From AAD After Login
  var isCallback = authContext.isCallback(window.location.hash);
  authContext.handleWindowCallback();
  if (isCallback && !authContext.getLoginError()) {
    window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
	}
	    // If not logged in force login
  var user = authContext.getCachedUser();
  if (user) {
	    // Logged in already
	}
	else {
	    // NOTE: you may want to render the page for anonymous users and render
	    // a login button which runs the login function upon click.
    authContext.login();
	}
	    // Acquire token for Files resource.
  authContext.acquireToken(config.endpoints.graphApiUri, function (error, token) {
	    // Handle ADAL Errors.
    if (error || !token) {
      console.log('ADAL error occurred: ' + error);
      return;
	}
	    // Execute GET request to Files API. FABIO: USE THE TEAMS GRAPH API BELOW
	    //var currentUserApiBaseUri = graphApiUri + "/beta/" + config.subscriptionId + "/users/" + user.userName;
	    //var filesUri = currentUserApiBaseUri + "/files";
    var myTasksUri = config.endpoints.graphApiUri + "/beta/planner/plans/CGMKjjEZ6kaQkOTZCJ0K2ZYAGaCS/tasks";


	    //GET ALL PERSONAL EVENTS (MY TASKS)
    $.ajax({
	    type: "GET",
	    url: myTasksUri,
	    headers: {
        'Authorization': 'Bearer ' + token,
	}
	}).done(function (response) {
      console.log('Successfully fetched joined teams.');
      console.log(response);

      var tasksData = "";
      $.each(response.value, function(key, elem){

	    /* ↓↓↓ get first letters ↓↓↓ */
	    // var alphaHeading =  elem.displayName.charAt(0);
	    // console.log("First Letter: " + alphaHeading);
          elem.title = elem.title;
          elem.dueDateTime = elem.dueDateTime;
          elem.percentComplete = elem.percentComplete;

          console.log(elem.percentComplete);

           
          var taskstatus = ''; 
          var taskstatusClass = '';

          if (elem.percentComplete === 100)  {
              taskstatusClass = 'done';
              taskstatus = 'Completed';
	}
	else if (elem.percentComplete < 100)  {
              taskstatusClass = '';
              taskstatus = 'To do';
	}
        var matches = elem.title.match(/[A-Z]/g);
	    // console.log("Arr: " + matches);
        var alphaHeadingResponse = "";
        var alphaHeadingResponsePrint = "";
        for(var key in matches) {
	    // console.log("key: " + key + " value: " + matches[key]);
          alphaHeadingResponse += matches[key];
          alphaHeadingResponsePrint = alphaHeadingResponse.substring(0, 2);
	
	}
	    // console.log(alphaHeadingResponsePrint);
	    /* ↑↑↑ get first letters ↑↑↑ */

        tasksData +=
	    /* ↓↓↓ team site ↓↓↓ */
 

          '<div class="row">' +
                '<div class="wizdom-myTasksImage">' +
			        '<span class="taskStatus ' + taskstatusClass +'"></span>' + // if completed then add class done
		        '</div>'  +
                '<div class="wizdom-myTasksContent">' +
			        '<p class="info">' + taskstatus +'</p>' +
			        '<p class="text ' + taskstatusClass +'">' + 
                    '<a href="https://tasks.office.com/contentformula.com/en-US/Home/Planner/#/plancharts?groupId=' + elem.id + '&tenantId=0cccbf82-2f37-4e6e-b152-1b60bea0dc68">' + elem.title+ '</a>' +
                    '</p>' +
                    '<p class="date"> Completed: ' + elem.percentComplete + '%</p>' + 
			        '<p class="date"> ' + elem.dueDateTime + '</p>' +
		        '</div>' +
		        '<div class="clear"></div>' +
        '</div>' 

          
	    /* ↑↑↑ team site ↑↑↑ */
	});
      $('#tasks-content-wrapper').html(tasksData);

	    // DO SOMETHING HERE WITH THE RESPONSE

	}).fail(function () {
      console.log('Fetching my tasks from Planner failed.');
	});

	});
	};
	    SP.SOD.executeFunc('sp.js','SP.ClientContext',GetTasksData);
	        </script>