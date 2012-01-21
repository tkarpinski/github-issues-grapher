/// <reference path="jquery-1.7.1.js"/>
/// <reference path="jquery.linq.js"/> 
/*globals jQuery, window, document*/

///<summary>
///
///</summary>
var githubv3 = function(){
    ///<summary>
    ///some helper functions
    ///</sumamry>
    "use strict";
    var $ = jQuery,
    getCookie = function (c_name)
        {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
        return unescape(y);
        }
        }
        },
    token = getCookie('access_token');
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        options.data = $.param($.extend(originalOptions.data, { access_token: token }));
    });
    var apiURI = "https://api.github.com",
    repos = function (orgName) {
        var dfd = $.Deferred();
        $.ajax(apiURI + "/orgs/"  +orgName + "/repos").done(function (response) {
            dfd.resolve(response);
        });
        return dfd.promise();
    },
    orgs = function () {
        var dfd = $.Deferred();
        $.ajax(apiURI + "/user/orgs").done(function (response) {
            dfd.resolve(response);
        });
        return dfd.promise();
    },
    user = function () {
        var dfd = $.Deferred();
        $.ajax(apiURI + "/user").done(function (response) {
            dfd.resolve(response);
        });
        return dfd.promise();
    },
    repoIssues = function (org,repo) {
        var dfd = $.Deferred();
        $.ajax(apiURI + "/repos/" + org +"/" + repo +"/issues").done(function (response) {
            dfd.resolve(response);
        });
        return dfd.promise();
    };
    return { getRepos: repos,
             getOrgs: orgs,
             getUser: user,
             getRepoIssues: repoIssues };
};