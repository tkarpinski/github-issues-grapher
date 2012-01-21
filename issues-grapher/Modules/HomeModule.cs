using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;

namespace issues_grapher.Modules
{
	public class HomeModule : NancyModule
	{
		public HomeModule()
		{
			Get["/"] = parameters => {
				if (Request.Cookies.ContainsKey("access_token"))
					return View["Dashboard"];
				else
					return View["Index"];
			};
			Get["/logout"] = parameters =>
			{
				return Response.AsRedirect("/").AddCookie("access_token", "", DateTime.Now.AddDays(-30));
			};
		}
	}
}