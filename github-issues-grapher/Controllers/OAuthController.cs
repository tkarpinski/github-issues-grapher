using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;


namespace github_issues_grapher.Controllers
{
    public class OAuthController : Controller
    {
        //
        // GET: /OAuth/

        public ActionResult Index()
        {
            return View();
        }
		public ActionResult authorize()
		{
			var clientID = System.Configuration.ConfigurationManager.AppSettings["OAuthClientID"];
			var result = Redirect(@"https://github.com/login/oauth/authorize?scope=repo&client_id=" + clientID);
			return result;
		}

		public ActionResult callback(string code)
		{
			
			try
			{
				var req = new WebClient();
				req.BaseAddress = @"https://github.com/login/oauth/access_token";
				var clientID = System.Configuration.ConfigurationManager.AppSettings["OAuthClientID"];
				var secret = System.Configuration.ConfigurationManager.AppSettings["OAuthSecret"];
				req.QueryString.Add("client_id", clientID);
				req.QueryString.Add("client_secret", secret);
				req.QueryString.Add("code", code);
				var response = req.UploadValues(req.BaseAddress, "POST", req.QueryString);
				ViewBag.response = System.Text.Encoding.UTF8.GetString(response);
			}
			catch (Exception ex)
			{
				ViewBag.response = ex.ToString();
			}
			return View();
			
		}

		public ActionResult Error()
		{
			return View();
		}
    }
}
