using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;
using System.Net;

namespace issues_grapher.Modules
{
	public class OAuthModule : NancyModule
	{
		public OAuthModule()
		{
			Get["/oauth/authorize"] = parameters =>
			{
				var clientID = System.Configuration.ConfigurationManager.AppSettings["OAuthClientID"];
				return Response.AsRedirect(@"https://github.com/login/oauth/authorize?scope=repo&client_id=" + clientID);
			};
			Get["/oauth/callback"] = parameters =>
			{
				var req = new WebClient();
				req.BaseAddress = @"https://github.com/login/oauth/access_token";
				var clientID = System.Configuration.ConfigurationManager.AppSettings["OAuthClientID"];
				var secret = System.Configuration.ConfigurationManager.AppSettings["OAuthSecret"];
				req.QueryString.Add("client_id", clientID);
				req.QueryString.Add("client_secret", secret);
				req.QueryString.Add("code", Request.Query.code);
				var response = req.UploadValues(req.BaseAddress, "POST", req.QueryString);
				var str = System.Text.Encoding.UTF8.GetString(response);
				var token = str.Substring(13, 40);
				return Response.AsRedirect("/").AddCookie("access_token", token);
			};
		}
	}
}


