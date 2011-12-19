/// <reference path="jquery-1.7.1-vsdoc.js"/>
/// <reference path="jquery.form.js"/>
/// <reference path="knockout-1.3.0beta.debug.js"/>
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
        var vm = {},
        getReposForOrg = function (orgName) {
            $.ajax("https://api.github.com/orgs/" + orgName + "/repos", {
                data: { "access_token": token }
            }).done(function (response) {

                var vm2 = {};
                vm2.repos = response;

                ko.applyBindings(vm2, document.getElementById('reposSelect'));
                $('#reposSelect').show();
            });
        };
        (function () {
            $.ajax("https://api.github.com/user", {
                data: { "access_token": token }
            }).done(function (response) {
                vm.name = response.name;
                vm.avatar = response.avatar_url;
                ko.applyBindings(vm, document.getElementById('nameOnly'));
            });
            $.ajax("https://api.github.com/user/orgs", {
                data: { "access_token": token }
            }).done(function (response) {

                var vm2 = {};
                vm2.orgs = response;
                ko.applyBindings(vm2, document.getElementById('orgsSelect'));
                if (vm2.orgs.length === 1) {
                    getReposForOrg(response[0].login);
                }
            });
        })();
        $('#orgsSelect').change(function () {
            var org = $(this).attr('value');
            getReposForOrg(org);

        });
        $("#GetIssues").click(function () {
            var org = $('#orgsSelect').attr('value'),
            repo = $('#reposSelect').attr('value');
            $.ajax("https://api.github.com/repos/" + org +"/" + repo +"/issues", { data: { "access_token": token} }).done(function (response) {
                var vm2 = $(response).toEnumerable();
                var d7 = new Date();
                d7.setDate(d7.getDate() - 7);
                var d30 = new Date();
                d30.setDate(d30.getDate() - 30);
                var vm3 = {};
                vm3.openIssuesCount = vm2.Where(function (x) { return x[0].state === "open" }).Count();
                vm3.closedCount = vm2.Where(function (x) { return x[0].state === "closed" }).Count();
                vm3.last7days = vm2.Where(function (x) { return Date.parse(x[0].created_at) > d7.valueOf() }).Count();
                vm3.last30days = vm2.Where(function (x) { return Date.parse(x[0].created_at) > d30.valueOf() }).Count();
                vm3.activitylast7Days = vm2.Where(function (x) { return Date.parse(x[0].updated_at) > d7.valueOf() }).Count();
                ko.applyBindings(vm3, document.getElementById('openIssuesDiv'));
                $('#openIssuesDiv').show();
            });
            $.ajax("https://api.github.com/repos/dyknow/dyknowme/issues?state=closed", { data: { "access_token": token} }).done(function (response) {
                var vm2 = $(response).toEnumerable();
                var d7 = new Date();
                d7.setDate(d7.getDate() - 7);
                var d30 = new Date();
                d30.setDate(d30.getDate() - 30);
                var vm3 = {};
                vm3.closedCount = vm2.Where(function (x) { return x[0].state === "closed" }).Count();
                vm3.last7days = vm2.Where(function (x) { return Date.parse(x[0].closed_at) > d7.valueOf() }).Count();
                vm3.last30days = vm2.Where(function (x) { return Date.parse(x[0].closed_at) > d30.valueOf() }).Count();
                ko.applyBindings(vm3, document.getElementById('closedIssuesDiv'));
                $('#closedIssuesDiv').show();
            });

        });

    });
})();