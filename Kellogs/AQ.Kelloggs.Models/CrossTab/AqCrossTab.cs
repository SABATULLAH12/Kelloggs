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

using System.Collections.Generic;
using System.ComponentModel;

namespace AQ.Kelloggs.Models.CrossTab
{

    public class CrossTab
    {
        public Settings settings { get; set; }
        public Body body { get; set; }
        public IList<Columnheader> Columnheader { get; set; }
    }

    public class Settings
    {
        const int defaultVal = 100;
        [DefaultValue("crosstab-container")]
        public string gridcontainerid { get; set; }
        public string zerothheaderlabel { get; set; }
        [DefaultValue("ZerothFormatter")]
        public string fnzerothinnerHtml { get; set; }
        [DefaultValue(true)]
        public bool mergedcolumn { get; set; }
        [DefaultValue(defaultVal)]
        public int colwidth { get; set; }
    }

    public class Body
    {
        public IList<Row> rows { get; set; }
    }

    public class Row
    {
        public IList<string> cells { get; set; }
        public IList<Row> rows { get; set; }
        public string rowheaderclass { get; set; }
    }

   
    public class Columnheader
    {
        public string label { get; set; }
        public IList<Child> children { get; set; }
    }
    
    public class Child
    {
        public string label { get; set; }
        public string fnbodyinnerhtml { get; set; }
        public string fnheaderinnerhtml { get; set; }
        public string fnsorting { get; set; }
        public IList<Child> children { get; set; }
        public bool sortable { get; set; }
    }

    public class ChartData
    {
        public string category { get; set; }
        public IList<ChartCategoryData> data { get; set; }
    }

    public class ChartCategoryData
    {
        public string x { get; set; }
        public double? y { get; set; }
        public double? c { get; set; }
        public double? s { get; set; }
        public double? ss { get; set; }
        public string color { get; set; }
    }
}
