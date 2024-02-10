<style type="text/css">
 
#PlannerMenu {
    margin: 0 0 30px 0;
    width: 100%;
}

#PlannerMenu>div {
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

#PlannerMenu>div>div {
    border: none;
    display:flex;
    flex: 0 0 33.3%;
    box-sizing: border-box;
}
#PlannerMenu>div>div> div {
    background:#fff;
    margin: 5px;
    padding: 15px;
}
#PlannerMenu>div>div>div a {
    display: table;
    vertical-align:top;
}

#PlannerMenu>div>div>div a:hover {
    text-decoration: none;
}

#PlannerMenu>div>div>div a>div {
    display: table-cell;
    vertical-align: top;
}

#PlannerMenu>div>div>div a>.media-left>div.image {
    width: 50px;
    text-align: center;
    color: white;
    background: #b21bfd;
    height: 50px;
    max-height: 50px;
    Position:relative;
}
#PlannerMenu>div>div>div a>.media-left>div.image span {
    display:block;
    width:100%;
    text-align:center;
    position:absolute;
    left:0;
    top:50%;
    transform:translateY(-50%);
}
#PlannerMenu>div>div>div a>div.content .heading {
    displaY: block;
    margin: 0 0 10px 0;
    color: black;
    font-weight: 900;
    font-size: 16px;
}
#PlannerMenu>div>div>div a>div.content {padding-left: 15px;}
#PlannerMenu>div>div>div a>div.content .text {
    color:black;
    border: 0;
    padding:0;
}
 
/* add bakcground colours to letters (title begins with '' */
#PlannerMenu>div>div>div a>.media-left>div.image[title^=A] {
    background: #757575;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=B] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=C] {
    background-color:darkmagenta;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=D] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=E] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=F] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=G] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=H] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=I] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=J] {
    background:#936507
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=K] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=L] {
    background: #2d874e
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=M] {
    background: #7a60f9
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=N] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=O] {
    background:darkmagenta;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=P] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=Q] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=R] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=S] {
    background-color: #1f8585;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=T] {
    background-color: #1f8585;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=U] {
    background: green;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=V] {
    background: #d111c3;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=W] {
    background: brown;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=X] {
    background: yellow;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=Y] {
    background:red;
}

#PlannerMenu>div>div>div a>.media-left>div.image[title^=Z] {
    background: orange;
}


 
</style>

     


<h2 class="wizdom-contentHeader">My Planner</h2>
<div id="PlannerMenu">
    <div id="planner-content-wrapper"></div>
</div>
<div class="myWizdomButtons">
    <a target="_blank" class="btn btn-primary" href="https://tasks.office.com/contentformula.com/en-US/Home/Planner/#/planhub">Go to My Office Planner</a>
</div>
 

<script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.0/js/adal.min.js"></script>

<script>
GetplannerData = function () {
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
    var myTasksUri = config.endpoints.graphApiUri + "/beta/groups/a38451b7-907e-48c3-a794-e287ba0a59c6/planner/plans";


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

      var plannerData = "";
      $.each(response.value, function(key, elem){

    /* ↓↓↓ get first letters ↓↓↓ */
    // var alphaHeading =  elem.displayName.charAt(0);
    // console.log("First Letter: " + alphaHeading);
        elem.title = elem.title;
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

        plannerData +=
    /* ↓↓↓ planner plans ↓↓↓ */
        '<div>' +
             '<div>' +
                '<a href="https://teams.microsoft.com/l/team/19%3a3c88c6f9a8304e1ba3c3f5900dab4cda%40thread.skype/conversations?groupId=' + elem.id + '&tenantId=0cccbf82-2f37-4e6e-b152-1b60bea0dc68">' +
                    '<div class="media-left">' +
                        '<div class="image" title=' + alphaHeadingResponsePrint + '>' +
                            '<span id="upcaseheading" class="img">' + alphaHeadingResponsePrint + '</span>' +
                            '<!-- <img src="/sites/WizdomDemo/SiteAssets/imgs/tem-sites-001.png" class="media-object" style="width:60px"> -->' +
                        '</div>' +
                    '</div>' +
                    '<div class="content media-body">' +
                        '<span class="heading">' + elem.title+ '</span>' +
                        '<span class="text">' + elem.title+ '</span>' +
    /* '<p>' + elem.description + '</p>' + */
                    '</div>' +
                '</a>' +
            '</div>' +
        '</div>'
    /* ↑↑↑ planner plans ↑↑↑ */
 


});
      $('#planner-content-wrapper').html(plannerData);

    // DO SOMETHING HERE WITH THE RESPONSE

}).fail(function () {
      console.log('Fetching my tasks from Planner failed.');
});

});
};
    SP.SOD.executeFunc('sp.js','SP.ClientContext',GetplannerData);
        </script>

       
 