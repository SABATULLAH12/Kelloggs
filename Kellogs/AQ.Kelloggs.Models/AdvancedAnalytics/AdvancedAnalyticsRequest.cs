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


namespace AQ.Kelloggs.Models.AdvancedAnalytics
{
    public class OspRequest
    {
        public string TimePeriod { get; set; }
        public string Market { get; set; }
        public string OppurtunityFor { get; set; }
        public string AdditionalFilter { get; set; }
        public string FilterIDs { get; set; }
        public string Benchmark { get; set; }
        public string RespType { get; set; }
        public string SelectionSummary { get; set; }
        public string SelectedItems { get; set; }
        public string RowAttributeId { get; set; }
        public int ColumnAttributeId { get; set; }
        public string ColumnName { get; set; }
        public string RowName { get; set; }
    }

    public class CMRequest
    {
        public string TimePeriod { get; set; }
        public string Market { get; set; }
        public string Dimension1 { get; set; }
        public string Dimension2 { get; set; }
        public string AdditionalFilter { get; set; }
        public string SelectedItems { get; set; }
    }

  
}
