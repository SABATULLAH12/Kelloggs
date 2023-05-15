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

#region Includes
using System.Collections.Generic;
#endregion

#region Namespace
namespace AQ.Kelloggs.Models
{
    #region Public Class

    #region Crosstab
    public class LeftPanelCrossTabResponse
    {
        public IList<Scenarios> Scenarios { get; set; }
        public IList<TimePeriod> TimePeriodList { get; set; }

    }
    public class Scenarios
    {
        public string Column { get; set; }
        public string Row { get; set; }
        public string RowNesting { get; set; }
        public string TimePeriod { get; set; }
        public string Market { get; set; }
        public string Occasion { get; set; }
        public string Category { get; set; }
        public string Metric { get; set; }
        public string Demographics { get; set; }
    }


    public class TimePeriod
    {
        public int FilterID { get; set; }
        public string TimePeriodType { get; set; }
        public string DisplayName { get; set; }
    }
    #endregion

    #region CorrespondenceMap
    public class LeftPanelCorrespondenceMapResponse
    {
        public IList<CMScenarios> Scenarios { get; set; }
        public IList<TimePeriod> TimePeriodList { get; set; }

    }
    public class CMScenarios
    {
        public string Dimesion1 { get; set; }
        public string Dimesion2 { get; set; }
        public string Occasion { get; set; }
        public string Category { get; set; }
        public string Metric { get; set; }
        public string Channel { get; set; }
        public string Demographics { get; set; }       
    }

    #endregion

    #region Dashboard

    public class DashboardResponse
    {
        public IList<CommonRequestDashboard> DashboardList { get; set; }
        public IList<TimePeriod> TimePeriodList { get; set; }
        public IList<UserEntity> UserList { get; set; }
        public IList<GroupEntity> GroupList { get; set; }

    }

    public class UserEntity
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
    }
    public class GroupEntity
    {
        public string GroupId { get; set; }
        public string GroupName { get; set; }
        public int NoOfUsers { get; set; }
    }
    #endregion

    #region Sticky Selection
    public class StickyRequest
    {
        public string FilterData { get; set; }
        public string UserId { get; set; }
        public int ModuleId { get; set; }
    }
    #endregion

    #region ReportGenerator

    public class ReportGeneratorResponse
    {
        public IList<OccasionAttribute> OcassionAttributes { get; set; }
    }

    public class OccasionAttribute
    {
        public string Attribute { get; set; }
        public int AttributeID { get; set; }
    }

    #endregion

    #region PerformanceDashboard

    public class PerformanceDashboardResponse
    {
        public IList<TimePeriod> TimePeriodList { get; set; }
    }

    #endregion

    #region Custom Filters
    public class CustomFilterResponse
    {
        public IList<CustomFilterEntity> CustomFilterList { get; set; }

    }

    public class CustomFilterEntity
    {
        public string Name { get; set; }
        public string FilterID { get; set; }
        public string ModuleId { get; set; }
        public string SelectionSummary { get; set; }
    }
    #endregion

    #region Custom Group
    public class CustomGroupResponse
    {
        public IList<CustomGroupEntity> CustomGroupList { get; set; }

    }

    public class CustomGroupEntity
    {
        public string Filter { get; set; }
        public string GroupId { get; set; }
        public string GroupName { get; set; }
        public string FilterID { get; set; }
        public string ModuleId { get; set; }
        public string SelectionSummary { get; set; }
        public string Parent { get; set; }
        public string ParentFilterIDs { get; set; }
        public string CountryID { get; set; }
        public bool IsItemLevel { get; set; }
    }
    #endregion

    #region Market Timeperiod

    public class MarketTimeperiodResponse
    {
        public IList<TableEntity> MarketTimeperiodList { get; set; }

    }

    public class TableEntity
    {
        public int TimePeriodId { get; set; }
        public string TimePeriod { get; set; }
        public int CountryId { get; set; }
        public string Country { get; set; }
    }
    #endregion
    #endregion
}

#endregion

