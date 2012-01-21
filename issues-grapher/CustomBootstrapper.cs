using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;
using Nancy.Conventions;
namespace issues_grapher
{
	public class CustomBoostrapper : DefaultNancyBootstrapper
	{
		protected override void ConfigureConventions(NancyConventions conventions)
		{
			base.ConfigureConventions(conventions);

			conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Scripts"));

		}
	}
}