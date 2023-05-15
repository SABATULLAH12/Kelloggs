/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2013 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

using System.Web.Optimization;

namespace AQ.Kelloggs.UI
{
    static class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/landing").Include("~/Content/Shared/Landing.css","~/Content/bootstrap.min.css"));
            bundles.Add(new ScriptBundle("~/bundles/landing").Include("~/Scripts/Plugins/angular.min.js", "~/Scripts/Common/Services.js", 
                "~/Scripts/Common/Constans.js", "~/Scripts/Shared/Landing.js"));

            bundles.Add(new ScriptBundle("~/bundles/crosstab").Include("~/Scripts/CrossTab/CrossTab.js", "~/Scripts/CrossTab/bootstrap-multiselect.js"));
            bundles.Add(new StyleBundle("~/Content/crosstab").Include("~/Content/CrossTab/CrossTab.css", "~/Content/CrossTab/bootstrap-multiselect.css"));
            bundles.Add(new ScriptBundle("~/bundles/charts").Include(
                    "~/Scripts/Plugins/Html2Canvas/rgbcolor.js",
                    "~/Scripts/Plugins/Html2Canvas/canvg.min.js",
                    "~/Scripts/Plugins/Html2Canvas/html2canvas.min.js",
                    "~/Scripts/Plugins/Html2Canvas/html2canvas.svg.min.js",
                    "~/Scripts/Plugins/HighCharts/highcharts.js",
                    "~/Scripts/Plugins/HighCharts/highcharts-more.js",
                    "~/Scripts/Plugins/HighCharts/exporting.js",
                    "~/Scripts/Plugins/HighCharts/export-data.js",                    
                    "~/Scripts/Plugins/d3/d3.min.js"
               ));
            BundleTable.EnableOptimizations = true;
        }
    }
}
