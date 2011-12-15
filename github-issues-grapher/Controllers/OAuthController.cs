using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
			var result = Redirect(@"https://github.com/login/oauth/authorize?client_id=" + clientID);
			return result;
		}

		public ActionResult callback()
		{
			return View();
		}

    }
}
