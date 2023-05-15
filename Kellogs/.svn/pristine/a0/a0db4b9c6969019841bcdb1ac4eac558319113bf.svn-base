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

namespace AQ.Kelloggs.Models.UserManagement
{
    public class UserManagementResponse {
        public IList<ResponseData> DataList { get; set; }

    }

    #region UserManagement
    public class ResponseData {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string BusinessUnit { get; set; }
        public string Department { get; set; }
        public string Role { get; set; }
        public string DateCreated { get; set; }
        public bool IsActive { get; set; }
        public string LastActivityDate { get; set; }
        public string GroupName { get; set; }
        public string CreatedBy { get; set; }
    }
    #region UserManagement

    public class UsersResponse
    {
        public IList<UserListEntity> UserList { get; set; }
        public IList<GroupListEntity> GroupList { get; set; }
        public IList<UserGroupMapList> UserGroupMap { get; set; }
        public IList<DetailedEntity> DetailedList { get; set; }
        public IList<AggregatedEntity> AggregatedList { get; set; }


    }

    public class UserGroupMapList
    {
        public string UserId { get; set; }
        public string GroupId { get; set; }
    }

    public class GroupListEntity
    {
        public string GroupId { get; set; }
        public string GroupName { get; set; }
        public string CreatedBy { get; set; }
        public string DateCreated { get; set; }
    }

    public class UserListEntity
    {
        public string Id { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public string Role { get; set; }
        public string BusinessUnit { get; set; }
        public string DateCreated { get; set; }
        public bool IsActive { get; set; }
        public string LastActivityDate { get; set; }
        public string Country { get; set; }

    }

    public class UsersTrackingResponse
    {
        public IList<DetailedEntity> DetailedList { get; set; }
        public IList<AggregatedEntity> AggregatedList { get; set; }
   

    }

    public class AggregatedEntity
    {
        public int SNo { get; set; }
        public string Country { get; set; }
        public string Department { get; set; }
        public int NoOfRegisteredUsers { get; set; }
        public int NoOfVisit { get; set; }
    }

    public class DetailedEntity
    {
        public int SNo { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Department { get; set; }
        public int NoOfVisit { get; set; }

    }


    #endregion

    #endregion
}
