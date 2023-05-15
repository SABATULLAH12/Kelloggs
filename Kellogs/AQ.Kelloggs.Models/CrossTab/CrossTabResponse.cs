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

namespace AQ.Kelloggs.Models.CrossTab
{
    class CrossTabResponse
    {
    }

    public class Response
    {
        public IList<ResponseData> DataList { get; set; }
    }

    #region Crosstab
    public class ResponseData
    {
        public string ColumnMetricName { get; set; }
        public string RowMetricName { get; set; }
        public string NestingMetricName { get; set; }
        public double? Percentage { get; set; }
        public int? UNumerator { get; set; }
        public double? WNumerator { get; set; }
        public int? USampleSize { get; set; }
        public double? WSampleSize { get; set; }
        public int? Significance { get; set; }
        public double? Change { get; set; }

    }
    #endregion

}
