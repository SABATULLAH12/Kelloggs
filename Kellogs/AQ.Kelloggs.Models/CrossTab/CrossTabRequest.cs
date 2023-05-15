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

namespace AQ.Kelloggs.Models
{
    #region Common Entities
    public class Request
    {
        public string Columns { get; set; }
        public string Rows { get; set; }
        public string RowNesting { get; set; }
        public string TimePeriod { get; set; }
        public string Market { get; set; }
        public string Occasion { get; set; }
        public string AdlFilters { get; set; }
        public string Significance { get; set; }
        public string RespType { get; set; }
        public string SelectionSummary { get; set; }
        public string SelectedItems { get; set; }
        public int WidgetId { get; set; }
        public string PercentageType { get; set; }
        public string SelectedModuleId { get; set; }

        public Request copyobject()

        {
            Request req = new Models.Request();
            req.Columns = this.Columns;
            req.Rows = this.Rows;
            req.RowNesting = this.RowNesting;
            req.TimePeriod = this.TimePeriod;
            req.Market = this.Market;
            req.Occasion = this.Occasion;
            req.AdlFilters = this.AdlFilters;
            req.Significance = this.Significance;
            req.RespType = this.RespType;
            req.SelectedItems = this.SelectedItems;
            req.SelectionSummary = this.SelectionSummary;
            req.WidgetId = this.WidgetId;
            req.PercentageType = this.PercentageType;
            return req;
        }
    }
    #endregion

}
