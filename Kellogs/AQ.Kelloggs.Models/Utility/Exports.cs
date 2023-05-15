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

using System;
using System.Collections.Generic;

namespace AQ.Kelloggs.Models
{
    public class CommonExportsRequest
    {
        public string Base64String { get; set; }
        public string ImageName { get; set; }
        public string Occasion { get; set; }
        public string theImage { get; set; }
        public string SelectionSummary { get; set; }
        public string SampleSize { get; set; }
        public string CreatedBy { get; set; }
        public string DateCreated { get; set; }
    }

    public class CommonExportsResponse
    {
        public int ResponseCode { get; set; }
        public string ResponseMessage { get; set; }

        public string Response { get; set; }
    }

    public class SnapShotExportPpt
    {
        public string theImage { get; set; }
        public string AdId { get; set; }
        public string ImageUrl { get; set; }
    }

    public class ExportToExcel
    {
        public IList<string> RightMetricList { get; set; }
        public IList<SnapshotExceldata> TableData { get; set; }
        public string AdName { get; set; }
        public string Campaign { get; set; }
        public string Length { get; set; }
        public string Brand { get; set; }
        public string Cohort { get; set; }
        public string Format { get; set; }
        public string MonthandYear { get; set; }
        public string ExcelName { get; set; }
        public string SummarySelection { get; set; }
    }

    public class SnapshotExceldata
    {
        public int index { get; set; }
        public int id { get; set; }
        public string attribute { get; set; }
        public int value { get; set; }
        public int significance { get; set; }

        public int sampleSize { get; set; }
        public string visible { get; set; }
    }
    public class ExportToExcelResponse
    {
        public string MyProperty { get; set; }
    }

    public class CommonRequestDashboard
    {
        public string UserID { get; set; }
        public int DashBoardTypeId { get; set; }
        public int DashBoardID { get; set; }
        public string DashboardName { get; set; }
        public string WidgetType { get; set; }
        public string WidgetName { get; set; }
        public int? WidgetID { get; set; }
        public string RequestObj { get; set; }
        public string SelectionSummary { get; set; }
        public string Image { get; set; }
        public string ResponseData { get; set; }
        public string SelectionObj { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public DateTime? SharedDate { get; set; }
        public string Flag { get; set; }

    }

    public class ReportRequest
    {
        public string TimeperiodId { get; set; }
        public string MarketId { get; set; }
        public string ReportId { get; set; }
        public string TimeperiodName { get; set; }
        public string MarketName { get; set; }
        public string Benchmark { get; set; }
        public string AdditionalFilter { get; set; }
        public string FilterName { get; set; }
        public string YearOverYearId { get; set; }
        public string YearOverYearName { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }
        public string Brand { get; set; }
        public string PrevBenchmark { get; set; }
        public string KelloggCategory { get; set; }
        public string RetailSalesValue { get; set; }
        public string RetailSalesName { get; set; }

    }
}

