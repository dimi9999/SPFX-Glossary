$(document).ready(function () {
    //  getskillArrayFromList();
    $('#btnUpdateProfile').click(function () {
        // document.location.href = "/_layouts/15/userdisp.aspx?ID=" + _spPageContextInfo.userId;
        document.location.href = _spPageContextInfo.siteAbsoluteUrl + "/_layouts/15/userdisp.aspx?ID=" + _spPageContextInfo.userId;
    });


    /*$("#chat_div").chatbox({id:"chat_div", 
    user:{key : "value"},
    title : "Intranet Bot",
    messageSent : function(id, user, msg) {
        $("#log").append(id + " said: " + msg + "<br/>");
        $("#chat_div").chatbox("option", "boxManager").addMsg("Joe", msg);
    }});

    $("#chat_div").chatbox("toggleContent", "toggleContent");*/

    /*BotChat.App({
    directLine: { secret: "Fw28fvLzSVY.cwA.6ag.geUHcRdHLmX8ub0LQaAR8WlyWJzaQ2hZooPbUcTdA7A" },
    user: { id: 'You' },
    bot: { id: 'botid' },
    resize: 'detect'
  }, document.getElementById("chat_div2"));*/
    function createCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    //var params = BotChat.queryParams(location.search);
    //var my_token = params['my_token'];
    var cookieConvId = readCookie('convId');
    var botConnection;

    if (cookieConvId == null) {
        botConnection = new BotChat.DirectLine({
            secret: 'Fw28fvLzSVY.cwA.6ag.geUHcRdHLmX8ub0LQaAR8WlyWJzaQ2hZooPbUcTdA7A'
        });
    }
    else {
        botConnection = new BotChat.DirectLine({
            secret: 'Fw28fvLzSVY.cwA.6ag.geUHcRdHLmX8ub0LQaAR8WlyWJzaQ2hZooPbUcTdA7A',
            conversationId: cookieConvId,
            watermark: "01",
            webSocket: false,
            pollingInterval: 2300
        });

    }

    BotChat.App({
        botConnection: botConnection
        , user: { id: 'USER_ID', name: 'User' },
        resize: 'detect'
    }, document.getElementById("chat_div2"));

    botConnection.connectionStatus$.subscribe(function (status) {
        if (status == 2) {  // wait for connection is 'OnLine' to send data to bot
            var convID = botConnection.conversationId;
            createCookie('convId', convID, 1);
        }
    });






    $(".wc-shellinput").keydown(function (event) {
        if (event.keyCode == 13) {
            $('.wc-send').click()
            event.preventDefault();
        }
    });



    jQuery.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + _spPageContextInfo.userLoginName + "'",
        method: "GET",
        dataType: 'json',
        success: function (data) {
            var iPers = 0;
            var userProfileExtra = [];
            $.each(data.UserProfileProperties, function (k, v) {
                if (v.Key == 'AboutMe' && v.Value != '') { iPers += 10 }
                if (v.Key == 'PictureURL' && v.Value != '') { iPers += 10 }
                if (v.Key == 'SPS-Responsibility' && v.Value != '') { iPers += 10 }
                if (v.Key == 'CellPhone' && v.Value != '') { iPers += 10 }
                if (v.Key == 'SPS-Location' && v.Value != '') { iPers += 10 }
                if (v.Key == 'SPS-Skills' && v.Value != '') { iPers += 10 }
                if (v.Key == 'SPS-Birthday' && v.Value != '') { iPers += 10 }
                if (v.Key == 'SPS-Interests' && v.Value != '') { iPers += 10 }
                if (v.Key == 'SPS-School' && v.Value != '') { iPers += 10 }
                if (v.Key == 'HomePhone' && v.Value != '') { iPers += 10 }
            });
            $('.progress-bar').width(iPers + '%');
            $('#progSpan').text(iPers + '% Complete');
        },
        error: function (req, err) { console.log('my message' + err); }
    }
    );
});

var linksArr = [];

function getMyLinks(returncall) {
    var soapEnv = "<?xml version='1.0' encoding='utf-8'?> \
    <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'> \
  <soap:Body> \
    <GetUserLinks xmlns='http://microsoft.com/webservices/SharePointPortalServer/UserProfileService'> \
      <AccountName>i:0#.f|membership|cf.1@hw.co.uk</AccountName> \
    </GetUserLinks> \
  </soap:Body> \
</soap:Envelope>";
    $.ajax({
        url: "https://hwconnect.sharepoint.com/sites/hwstage/_vti_bin/userprofileservice.asmx",
        type: "POST",
        dataType: "xml",
        data: soapEnv,
        contentType: "text/xml; charset=\"utf-8\"",
        complete: function (xData, status) {
            $(xData.responseText).find("QuickLinkData").each(function () {
                linksArr.push({ linkurl: $(this).find("url").text(), linkname: $(this).find("name").text(), image: '/sites/hwstage/Style Library/HW/img/icons/myLink-2.png', description: '' });
            });
            returncall(linksArr);
        }
    });
}

function getGlobleLink(returncall) {
    var clientContext = SP.ClientContext.get_current();
    var lList = clientContext.get_site().get_rootWeb().get_lists().getByTitle('Home Links');
    var camlQuery = new SP.CamlQuery();
    var lcollListItems = lList.getItems(camlQuery);
    clientContext.load(lcollListItems);
    clientContext.executeQueryAsync(function () {
        var listItemEnumerator = lcollListItems.getEnumerator();
        while (listItemEnumerator.moveNext()) {
            var oListItem = listItemEnumerator.get_current();
            linksArr.push({ linkurl: oListItem.get_item('Link').get_url(), linkname: oListItem.get_item('Link').get_description(), image: oListItem.get_item('Image').get_url(), description: oListItem.get_item('CategoryDescription') });
        }
        getMyLinks(returncall);
    }, onFailed);
}
m.directive('ppPromotion', function () {
    return {
        template: '<div>' +
        '<table>' +
        '<tr>' +
        '<td>' +
        '<img src="{{item.ImageLink}}" style="width: 100px;">' +
        '</td>' +
        '<td style="padding-left: 12px;">' +
        '<a href="{{item.Link}}" class="" style="">{{item.Title}}</a>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</div>',
        restrict: 'E',
        scope: {
            item: '='
        }
    };
});

m.directive('ppNotification', function () {
    return {
        template: '<div class="media">' +
        '<a href="#" ng-click="DiscardNotification()" style="float:right;">X</a>' +
        '<a class="pull-left" href="">' +
        '<img class="media-object" ng-src="{{item.logo}}" alt="" />' +
        '</a>' +
        '<div class="media-body">' +
        '<p>' +
        '<a ng-href="{{item.Path}}">{{item.Title}}</a>' +
        '</p>' +
        '<ul class="list-inline list-unstyled">' +
        '<li>' +
        '<a data-toggle="modal" data-username="{{item.username}}" data-target="#userprofile">' +
        '<span class="hw-user-name">{{item.Author}}</span>' +
        '</a>' +
        '- {{item.Write}}' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        scope: {
            item: '='
        },
        controller: function ($scope, NotificationService) {
            $scope.DiscardNotification = function () {
                console.log($scope.item.UniqueId);
                var flagAllNtf = false;
                for (var i = 0; i < NotificationService.AllNotifications.length; i++) {
                    if (NotificationService.AllNotifications[i].UniqueId == $scope.item.UniqueId) {
                        NotificationService.AllNotifications[i].IsDismissed = true;
                        flagAllNtf = true;
                        break;
                    }
                }
                if (flagAllNtf) {
                    NotificationService.UpdateNotificationsJson().then(function (result) {
                        console.log(result);
                    });
                }
            }
        }
    };
});

m.controller('HomeController', function ($scope, NotificationService, $filter) {
    $scope.allHomeLinkRows = [];
    $scope.UserNotificationCount = 0;
    $scope.IsNoSubscription = false;
    $scope.OfficeLocationNewsUrl = _spPageContextInfo.siteAbsoluteUrl + "/RegionsAndOffices/Pages/Office.aspx#";
    $scope.TopNewsByLocation = {};

    getAllHomeLinks();
    function getAllHomeLinks() {
        getGlobleLink(
            function (links) {
                var linktemp = chunk(links, 4);
                $.each(linktemp, function (i, v) {
                    $scope.allHomeLinkRows.push({ linkRow: v });
                });
                $scope.$apply();
            }
        );
    }
    EndoArr0 = [];
    $scope.EndoArr1 = [];
    $scope.EndoArr2 = [];


    $scope.ThingsViewAll = "../Pages/AllNotifications.aspx";

    /**
     * Start notification changes
     */
    //getAdminTasks();
    getPromotions();
    getSubscriptions();
    getOfficeLocation();
    function getAdminTasks() {
        $scope.needToRead = [];
        var clientContext = SP.ClientContext.get_current();
        var lList = clientContext.get_site().get_rootWeb().get_lists().getByTitle('AdminTask');
        var camlQuery = new SP.CamlQuery();
        var qr = '<View> <Query> <Where> <And> <Geq> <FieldRef Name="DueDate" /> <Value Type="DateTime"> <Today /> </Value> </Geq> <Or> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo"/> </Membership> <Eq> <FieldRef Name="AssignedTo"/> <Value Type="Integer"> <UserID/> </Value> </Eq> </Or> </And> </Where> <OrderBy> <FieldRef Name="Modified" Ascending="FALSE" /> </OrderBy> </Query> <RowLimit>20</RowLimit> </View>';
        camlQuery.set_viewXml(qr);

        var lcollListItems = lList.getItems(camlQuery);
        clientContext.load(lcollListItems);
        clientContext.executeQueryAsync(function () {
            var listItemEnumerator = lcollListItems.getEnumerator();
            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                var icount = $scope.needToRead.length;
                if (icount < 8) {
                    $scope.needToRead.push({ Path: 'https://hwconnect.sharepoint.com/Pages/Task-Details.aspx?taskid=' + oListItem.get_item('ID'), Title: oListItem.get_item('Title'), Author: oListItem.get_item('Author').get_lookupValue(), Write: oListItem.get_item('Created').format('MMM dd'), logo: _spPageContextInfo.siteAbsoluteUrl + "/Style Library/HW/icons/pending-circle.png" });
                }
            }
        }, onHomeFailed);

    }

    function getOfficeLocation() {
        NotificationService.GetUserOfficeLocation().then(function (result) {
            $scope.OfficeLocation = result;
            NotificationService.GetTopNewsByLocation(result).then(function (tmpResult) {
                $scope.TopNewsByLocation = NotificationService.TopNewsByLocation;
            });
        });
    }
    $scope.NavigateTopNewsOfficeLocation = function(){
        location.href = $scope.TopNewsByLocation.Url ;
    }
    $scope.NavigateOfficeLocation = function () {
        location.href = $scope.OfficeLocationNewsUrl + $scope.OfficeLocation;
    }

    function getPromotions() {
        NotificationService.GetAllPromotionsFromSP().then(function (result) {
            console.log(result);
            $scope.Promotions = NotificationService.AllPromotions;
        });
    }
    function getSubscriptions() {
        NotificationService.GetAllNotifications().then(function (result) {
            console.log(result);
            $scope.needToRead = NotificationService.UserNotifications;
            $scope.IsNoSubscription = NotificationService.IsNoSubscription;
            if ($scope.IsNoSubscription) {
                strPopupURL = _spPageContextInfo.siteAbsoluteUrl + "/Lists/Topic%20Subscription/NewForm.aspx";
            }
            else {
                strPopupURL = _spPageContextInfo.siteAbsoluteUrl + "/Lists/Topic%20Subscription/EditForm.aspx?ID=" + NotificationService.SubscriptionId;
            }
            $scope.Subscriptions = NotificationService.Subscriptions;
        });
    }
    function updateUnreadNotifications() {
        $scope.needToRead = NotificationService.UserNotifications;
        $scope.UndismissedNotificationsCount = $filter('filter')(NotificationService.UserNotifications, { IsDismissed: false }).length;
    }
    NotificationService.RegisterForNotifications(updateUnreadNotifications);

    $scope.onClickToOpenPopup = function () {
        SP.UI.ModalDialog.OpenPopUpPage(strPopupURL, function () { getSubscriptions(); }, 550, 360);
    }
    function onHomeFailed(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }
    /**
     * End notification changes
     */



    getskillArrayFromList();
    function getskillArrayFromList() {
        var clientContext = SP.ClientContext.get_current();
        var oList = clientContext.get_site().get_rootWeb().get_lists().getByTitle('Skills Endorsements');
        var camlQuery = new SP.CamlQuery();
        var qr = '<View><Query><OrderBy><FieldRef Name="Modified" /></OrderBy></Query><RowLimit>100</RowLimit></View>';
        camlQuery.set_viewXml(qr);
        collListItems = oList.getItems(camlQuery);
        clientContext.load(oList);
        clientContext.load(collListItems);
        clientContext.executeQueryAsync(
            function () {
                var listItemEnumerator = collListItems.getEnumerator();
                while (listItemEnumerator.moveNext()) {
                    var oListItem = listItemEnumerator.get_current();
                    var cool = oListItem.get_item('Title');
                    EndoArr0.push({ Skiller: oListItem.get_item('User').get_lookupValue(), SkillerID: oListItem.get_item('User').get_lookupId(), EndoBy: oListItem.get_item('EndoUser').get_lookupValue(), EndoByID: oListItem.get_item('EndoUser').get_lookupId(), date: String.format('{0:dd}-{0:MMM}-{0:yyyy}', new Date(oListItem.get_item('Modified'))) });
                }
                EndoArr0 = remove_duplicates(EndoArr0);
                EndoArr0 = chunk(EndoArr0, 5);
                if (EndoArr0.length >= 1)
                    $scope.EndoArr1 = EndoArr0[0];
                if (EndoArr0.length >= 2)
                    $scope.EndoArr2 = EndoArr0[1];
                $.each($scope.EndoArr1, function (i, v) {
                    getUserProfilePicture(v.SkillerID, function (strURL) {
                        v.pictureURL = strURL;
                        $scope.$apply();
                    });
                });
                $.each($scope.EndoArr2, function (i, v) {
                    getUserProfilePicture(v.SkillerID, function (strURL) {
                        v.pictureURL = strURL;
                        $scope.$apply();
                    });
                });


            }, onFailed);
    }

    function getUserProfilePicture(UserID, callbackString) {
        jQuery.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/GetUserById(" + UserID + ")",
            method: "GET",
            dataType: 'json',
            success: function (data) {
                jQuery.ajax({
                    url: _spPageContextInfo.siteAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + data.LoginName.split('|')[2] + "'",
                    method: "GET",
                    dataType: 'json',
                    success: function (data1) {
                        callbackString(data1.PictureUrl);
                    },
                    error: function (req, err) { console.log('my message' + err); }
                });
            },
            error: function (req, err) { console.log('my message' + err); }
        });
    }

    function remove_duplicates(objectsArray) {
        var usedObjects = {};
        for (var i = objectsArray.length - 1; i >= 0; i--) {
            var so = JSON.stringify(objectsArray[i]);
            if (usedObjects[so]) {
                objectsArray.splice(i, 1);
            } else {
                usedObjects[so] = true;
            }
        }
        return objectsArray;
    }

    function onFailed(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    function chunk(arr, chunkSize) {
        var R = [];
        for (var i = 0, len = arr.length; i < len; i += chunkSize)
            R.push(arr.slice(i, i + chunkSize));
        return R;
    }

    //Start code merge

    $scope.aNewsTitle = ""; $scope.aNewsURL = ""; $scope.aNewsDate = ""; $scope.aNewsAuthor = "";
    $scope.bNewsTitle = ""; $scope.bNewsURL = ""; $scope.bNewsDate = ""; $scope.bNewsAuthor = "";
    $scope.cNewsTitle = ""; $scope.cNewsURL = ""; $scope.cNewsDate = ""; $scope.cNewsAuthor = "";
    $scope.dNewsTitle = ""; $scope.dNewsURL = ""; $scope.dNewsDate = ""; $scope.dNewsAuthor = "";
    $scope.eNewsTitle = ""; $scope.eNewsURL = ""; $scope.eNewsDate = ""; $scope.eNewsAuthor = "";
    $scope.fNewsTitle = ""; $scope.fNewsURL = ""; $scope.fNewsDate = ""; $scope.fNewsAuthor = "";
    $scope.gNewsTitle = ""; $scope.gNewsURL = ""; $scope.gNewsDate = ""; $scope.gNewsAuthor = "";

    $scope.hNewsTitle = ""; $scope.hNewsURL = ""; $scope.hNewsDate = ""; $scope.hNewsAuthor = "";
    $scope.h1NewsTitle = ""; $scope.h1NewsURL = ""; $scope.h1NewsDate = ""; $scope.h1NewsAuthor = "";

	$scope.a1NewsTitle = ""; $scope.a1NewsURL = ""; $scope.a1NewsDate = ""; $scope.a1NewsAuthor = "";
    $scope.b1NewsTitle = ""; $scope.b1NewsURL = ""; $scope.b1NewsDate = ""; $scope.b1NewsAuthor = "";
    $scope.c1NewsTitle = ""; $scope.c1NewsURL = ""; $scope.c1NewsDate = ""; $scope.c1NewsAuthor = "";

    
    $scope.newsimageurl = "";
    var a = 0; b = 0; c = 0; d = 0; e = 0; f = 0; g = 0; a1 = 0; b1 = 0; c1 = 0; h = 0; h1 = 0;
    listItems("Pages","news","<View><Query><Where><Eq><FieldRef Name='Show_x0020_in_x0020_global_x0020_home' /><Value Type='Boolean'>1</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy></Query><RowLimit>6</RowLimit></View>", function (globleReturnItems) {
        while (globleReturnItems.moveNext()) {
            var oListItem = globleReturnItems.get_current();
            if (oListItem.get_item('PublishingPageImage') != null && a == 0) {
                $scope.newsimageurl = oListItem.get_item('PublishingPageImage').split('src="')[1].split('" style="')[0];
            }
            
             if (oListItem.get_item('PublishingPageImage') != null && a1 == 0) {
                $scope.newnewsimageurl = oListItem.get_item('PublishingPageImage').split('src="')[1].split('" style="')[0];
            }

            var oListItem = globleReturnItems.get_current();
            if (a == 0) { a = oListItem.get_item('ID'); $scope.aNewsTitle = oListItem.get_item('Title'); $scope.aNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.aNewsDate = oListItem.get_item('Created').format('dd MMM yyyy'); $scope.aNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue(); }
            else if (b == 0) { b = oListItem.get_item('ID'); $scope.bNewsTitle = oListItem.get_item('Title'); $scope.bNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.bNewsDate = oListItem.get_item('Created').format('dd MMM yyyy');$scope.bNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue(); }
            else if (c == 0) { c = oListItem.get_item('ID'); $scope.cNewsTitle = oListItem.get_item('Title'); $scope.cNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.cNewsDate = oListItem.get_item('Created').format('dd MMM yyyy'); $scope.cNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();}

            else if (a1 == 0) { a1 = oListItem.get_item('ID'); $scope.a1NewsTitle = oListItem.get_item('Title'); $scope.a1NewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.a1NewsDate = oListItem.get_item('Created').format('dd MMM yyyy'); $scope.a1NewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();}
            else if (b1 == 0) { b1 = oListItem.get_item('ID'); $scope.b1NewsTitle = oListItem.get_item('Title'); $scope.b1NewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.b1NewsDate = oListItem.get_item('Created').format('dd MMM yyyy'); $scope.b1NewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();}
            else if (c1 == 0) { c1 = oListItem.get_item('ID'); $scope.c1NewsTitle = oListItem.get_item('Title'); $scope.c1NewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.c1NewsDate = oListItem.get_item('Created').format('dd MMM yyyy'); $scope.c1NewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();}
        }
        $scope.$apply();


        var clientContext = new SP.ClientContext.get_current();
        personProperties = new SP.UserProfiles.PeopleManager(clientContext).getMyProperties();
        clientContext.load(personProperties);
        clientContext.executeQueryAsync(function () {
        if( personProperties.get_userProfileProperties()['Office']!='')
        {
        	var userLocation = personProperties.get_userProfileProperties()['Office'];
        }
        else
        {
            var userLocation ='London';// personProperties.get_userProfileProperties()['Office'];
        }
            listItems('Office',"", "<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + userLocation + "</Value></Eq></Where></Query></View>", function (permissionResult) {
                var strIfRegionHead = "";
                while (permissionResult.moveNext()) {
                    var oListItem = permissionResult.get_current();
                    strIfRegionHead = oListItem.get_item('Region').get_lookupValue();
                }
      


        //CHANGED CAML QUERY FOR TESTING
        listItems("Pages","news","<View><Query><Where><And><Eq><FieldRef Name='Regions0' /><Value Type='Lookup'>"+ strIfRegionHead +"</Value></Eq><And><Neq><FieldRef Name='ID' /><Value Type='Counter'>" + a + "</Value></Neq><And><Neq><FieldRef Name='ID' /><Value Type='Counter'>" + b + "</Value></Neq><And><Neq><FieldRef Name='ID' /><Value Type='Counter'>" + c + "</Value></Neq><And><Neq><FieldRef Name='ID' /><Value Type='Counter'>" + a1 + "</Value></Neq><And><Neq><FieldRef Name='ID' /><Value Type='Counter'>" + b1 + "</Value></Neq><Neq><FieldRef Name='ID' /><Value Type='Counter'>" + c1 + "</Value></Neq></And></And></And></And></And></And></Where><OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy></Query><RowLimit>3</RowLimit></View>", function (regionReturnItems) {
            while (regionReturnItems.moveNext()) {
                var oListItem = regionReturnItems.get_current();
                if (d == 0) { d = oListItem.get_item('ID'); $scope.dNewsTitle = oListItem.get_item('Title'); $scope.dNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.dNewsDate = oListItem.get_item('Created').format('dd MMM yyyy') + ' - ' + strIfRegionHead;  $scope.dNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();  }
                else if (e == 0) { e = oListItem.get_item('ID'); $scope.eNewsTitle = oListItem.get_item('Title'); $scope.eNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.eNewsDate = oListItem.get_item('Created').format('dd MMM yyyy') + ' - ' + strIfRegionHead; $scope.eNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();  }
                else if (h == 0) { h = oListItem.get_item('ID'); $scope.hNewsTitle = oListItem.get_item('Title'); $scope.hNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.hNewsDate = oListItem.get_item('Created').format('dd MMM yyyy') + ' - ' + strIfRegionHead; $scope.hNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();  }
            }
            $scope.$apply();
            
            //CHANGED CAML QUERY FOR TESTING
            listItems("Pages","news","<View><Query><Where><Eq><FieldRef Name='HW_x0020_Office0' /><Value Type='Lookup'>"+ userLocation +"</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='FALSE' /></OrderBy></Query><RowLimit>3</RowLimit></View>", function (officeReturnItems) {
                while (officeReturnItems.moveNext()) {
                    var oListItem = officeReturnItems.get_current();
                    if (f == 0) { f = oListItem.get_item('ID'); $scope.fNewsTitle = oListItem.get_item('Title'); $scope.fNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.fNewsDate = oListItem.get_item('Created').format('dd MMM yyyy') + ' - ' + userLocation; $scope.fNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue(); }
                    else if (g == 0) { g = oListItem.get_item('ID'); $scope.gNewsTitle = oListItem.get_item('Title'); $scope.gNewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.gNewsDate = oListItem.get_item('Created').format('dd MMM yyyy') + ' - ' + userLocation; $scope.gNewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();  }
                    else if (h1 == 0) { h1 = oListItem.get_item('ID'); $scope.h1NewsTitle = oListItem.get_item('Title'); $scope.h1NewsURL = _spPageContextInfo.siteAbsoluteUrl + oListItem.get_item('FileRef'); $scope.h1NewsDate = oListItem.get_item('Created').format('dd MMM yyyy') + ' - ' + userLocation; $scope.h1NewsAuthor ='by '+ oListItem.get_item('PublishingContact').get_lookupValue();  }
                }
                $scope.$apply();
            });

        });
        
              });

        });

    });
    //End code merge



});



function listItems(listname,sitename,query, returncall) {
    var clientContext = new SP.ClientContext(_spPageContextInfo.siteAbsoluteUrl + "/"+sitename);
    var oList = clientContext.get_web().get_lists().getByTitle(listname);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(query);
    var collListItems = oList.getItems(camlQuery);
    clientContext.load(collListItems);
    clientContext.executeQueryAsync(function () {
        returncall(collListItems.getEnumerator())
    }, function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }
);
}



/* chat bot custom frond end action 
----------------------------------- */


