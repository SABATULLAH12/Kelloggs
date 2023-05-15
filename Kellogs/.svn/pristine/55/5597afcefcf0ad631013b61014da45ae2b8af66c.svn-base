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

namespace AQ.Kelloggs.Models.AdvancedAnalytics
{

    #region CM
    public class CMResponse
    {
        public IList<CMResponseData> DataList { get; set; }
    }

    public class CMResponseData
    {
        public string name { get; set; }
        public string x { get; set; }
        public string y { get; set; }
        public string chiDist { get; set; }
    }

    public class CMPptResponse
    {
        public IList<CMPptResponseData> DataList { get; set; }
     
    }

    public class CMPptResponseData {

        public string species { get; set; }
        public double xVal { get; set; }
        public double yVal { get; set; }
        public double distance { get; set; }
        public int radialWidth { get; set; }
        public string colorDot { get; set; }
        public IList<NearElementList> nearEle { get; set; }
      

    }

    public class NearElementList
    {
        public string Text { get; set; }
        public double dis { get; set; }
    }

    #endregion
    #region OSP
    public class OspResponse
    {
        public IList<OspResponseData> DataList { get; set; }
    }
    public class OspResponseData
    {
        public string SelectedAttribute { get; set; }
        public string Occasion { get; set; }
        public double? Distribution { get; set; }
        public double? RetailValue { get; set; }
        public string ColorScheme { get; set; }
        public double? WSampleSize { get; set; }
        public double? USampleSize { get; set; }
        public double? Change { get; set; }
        public int? Significance { get; set; }
        public string RowAttribute { get; set; }
        public int? ColumnAttribute { get; set; }
        public double? ShareWSampleSize { get; set; }
        public double? ShareUSampleSize { get; set; }
        public double? ShareChange { get; set; }
        public int? ShareSignificance { get; set; }
        public double? Share { get; set; }
        public int Level { get; set; }

    }

    public class OspInnerResponse
    {
        public IList<OspInnerResponseData> DataList { get; set; }
    }
    public class OspInnerResponseData
    {
        public string GroupName { get; set; }
        public string Header { get; set; }
        public string Attribute { get; set; }
        public double? TotalValue { get; set; }
        public double? Value { get; set; }
        public double? Change { get; set; }
        public int? Significance { get; set; }
        public double? TotalChange { get; set; }
        public int? USampleSize { get; set; }
        public int? UTotalSampleSize { get; set; }
        public double? WSampleSize { get; set; }
        public double? WTotalSampleSize { get; set; }
        public int? UNumerator { get; set; }
        public double? WNumerator { get; set; }
        public int? UTotalNumerator { get; set; }
        public double? WTotalNumerator { get; set; }



    }
    #endregion

}
