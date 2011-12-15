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
		HttpWebRequest webRequest;
		public ActionResult callback(string code)
		{
			var req = new WebClient();
			req.BaseAddress = @"https://github.com/login/oauth/access_token";

			req.QueryString.Add("client_id", System.Configuration.ConfigurationManager.AppSettings["OAuthClientID"]);
			req.QueryString.Add("client_secret", System.Configuration.ConfigurationManager.AppSettings["OAuthSecret"]);
			req.QueryString.Add("code", code);
			var response = req.UploadValues(req.BaseAddress, "POST", req.QueryString);

			ViewBag.response = response;
			return View();
		}

		void FinishWebRequest(IAsyncResult result)
		{
			webRequest.EndGetResponse(result);
		}

    }
}
