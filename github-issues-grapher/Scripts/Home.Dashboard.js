﻿/// <reference path="jquery-1.7.1-vsdoc.js"/>
/// <reference path="jquery.form.js"/>
/// <reference path="knockout-1.30beta.debug.js"/>
/// <reference path="jquery.linq.js"/>
/*globals jQuery, window, document*/

///<summary>
///
///</summary>
var homeDashboard = (function () {
    ///<summary>
    ///some helper functions
    ///</sumamry>
    "use strict";
    var $ = jQuery;
    $(document).ready(function () {
    var token = localStorage.getItem("OAuthToken");
    var vm = {};
    (function() {
        $.ajax("https://api.github.com/user", {
        data: {"access_token" : token }}).done(function(response) {
        vm.name = response.name;
        vm.avatar = response.avatar_url;
        ko.applyBindings(vm);
         });
    })();
    $("#GetIssues").click(function() {
        $.ajax("https://api.github.com/repos/dyknow/dyknowme/issues", {data: {"access_token" : token}}).done(function (response) {
            var vm2 = $(response).toEnumerable();
            var v3 ={};
            var d7 = new Date();
            d7.setDate(d7.getDate() - 7);
            var d30 = new Date();
            d30.setDate(d30.getDate() - 30);
            v3.openIssuesCount = vm2.Where(function (x) {return x[0].state === "open"}).Count();
            v3.closedCount = vm2.Where(function (x) {return x[0].state === "closed"}).Count();
            v3.last7days = vm2.Where(function (x) {return Date.parse(x[0].created_at) > d7.valueOf()}).Count();
            v3.last30days = vm2.Where(function (x) {return Date.parse(x[0].created_at) > d30.valueOf()}).Count();
            v3.activitylast7Days = vm2.Where(function (x) {return Date.parse(x[0].updated_at) > d7.valueOf()}).Count();
        });
    
    });

    });
}) ();