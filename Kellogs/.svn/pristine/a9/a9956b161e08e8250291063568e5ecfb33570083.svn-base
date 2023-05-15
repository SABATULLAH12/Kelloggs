var roles = [
    { className: 'roles-dropdown-option1', role: 'Admin' },
    { className: 'roles-dropdown-option2', role: 'Super User' },
    { className: 'roles-dropdown-option3', role: 'Investigator' },
    { className: 'roles-dropdown-option4', role: 'Inform' }
];
var userList = [];
var groupList = [];
var userGroupMap = [], detailedUsageInfo=[],aggregateUsageInfo=[];
var maxUsersAllowedInGroup = 20;
//Need to be created dynamically later
var groups = [
    { className: 'groups-dropdown-option1', group: 'Global Insights Team' },
    { className: 'groups-dropdown-option2', group: 'Global Business Heads' },
    { className: 'groups-dropdown-option3', group: 'Global Cereal' },
    { className: 'groups-dropdown-option4', group: 'US Insights' }
];

var statuses = [
    { className: 'status-dropdown-option1', status: 'Active', isSelected: false },
    { className: 'status-dropdown-option2', status: 'Inactive', isSelected: false },
];

var usersTableHeaders = [
    { className: 'table-header1', headerName: 'USER ID', width_style: '9%' },
    { className: 'table-header2', headerName: 'NAME', width_style: '9%' },
    { className: 'table-header3', headerName: 'EMAIL', width_style: '14%' },
    { className: 'table-header4', headerName: 'DEPARTMENT', width_style: '12%' },
    { className: 'table-header5', headerName: 'ROLE', width_style: '10%' },
    { className: 'table-header6', headerName: 'DATE CREATED', width_style: '11%' },
    { className: 'table-header7', headerName: 'USER STATUS', width_style: '10%' },
    { className: 'table-header8', headerName: 'LAST ACTIVITY DATE', width_style: '14%' },
    { className: 'table-header9', headerName: 'MANAGE USERS', width_style: '11%' },
];

var addUsersTableHeaders = [
    { className: 'table-header1', headerName: 'USER ID', width_style: '14%' },
    { className: 'table-header2', headerName: 'NAME', width_style: '20%' },
    { className: 'table-header3', headerName: 'EMAIL', width_style: '28%' },
    { className: 'table-header10', headerName: 'BUSINESS UNIT', width_style: '19%' },
    { className: 'table-header4', headerName: 'DEPARTMENT', width_style: '19%' }
];

var groupsTableHeaders = [
    { className: 'group-header1', headerName: 'GROUP NAME', width_style: '30%' },
    { className: 'group-header2', headerName: 'CREATED BY', width_style: '30%' },
    { className: 'group-header3', headerName: 'DATE CREATED', width_style: '20%' },
    { className: 'group-header4', headerName: 'MANAGE USERS', width_style: '20%' },
];

angular.module('starter.controllers', ["ngAnimate", 'commonService', 'ui.bootstrap'])
.controller('parent-controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {
    $scope.ModuleIsHidden = true;
    //$scope.showSettings = false;
    $scope.leftMenuIsHidden = true;



    $scope.parent_list = [];
    $scope.Roles = roles;
    $scope.Groups = groups;
    $scope.Status = statuses;

    $scope.UsersTableHeaders = usersTableHeaders;
    $scope.AddUsersTableHeader = addUsersTableHeaders;
    $scope.GroupsTablesHeaders = groupsTableHeaders;

    angular.element(document.querySelectorAll(".moduleLevel[title='USER MANAGEMENT']")).addClass("active");
    angular.element(document.querySelectorAll(".module-name .middleAlign")).text("User Management");
    //angular.element(document.getElementsByClassName("excelDiv")).removeClass("disableSelection");
    //angular.element(document.getElementsByClassName("ddExclIcon")).addClass("disableSelection");
    

    //add specific class for internet explorer
    if ((/*@cc_on!@*/false || !!document.documentMode)) {
        angular.element("body,html,form").addClass("ie11");
    }

    loadCommonFunctionalities($scope, commonService);

    $scope.Exports = function (type) {
        var response = '';
        var responseUser = "";
        showBackgroundShadow(true, true);
        if (type == 'CreateBatchUsers')
            response = angular.copy(groupList);
        else if (type == 'DeleteBatchUsers')
            response = null;
        else if (type == 'ExportGroupData') {
            response = angular.copy(groupList);
            responseUser = angular.copy(userList);
            angular.forEach(responseUser, function (a, b) {
                let groups = userGroupMap.filter(function (e) { return a.UserID == e.UserId });
                GroupName = "";
                angular.forEach(groups, function (a, b) {
                    GroupName += groupList.filter(function (e) { return e.GroupId == a.GroupId })[0].GroupName + ", "
                })
                a.GroupName = GroupName.substr(0, GroupName.length - 2);
            })
        }
        else if (type == 'ExportUserData') {
            response = angular.copy(userList);
            angular.forEach(response, function (a, b) {
                let groups = userGroupMap.filter(function (e) { return a.UserID == e.UserId });
                GroupName = "";
                angular.forEach(groups, function (a, b) {
                    GroupName += groupList.filter(function (e) { return e.GroupId == a.GroupId })[0].GroupName + ", "
                })
                a.GroupName = GroupName.substr(0, GroupName.length - 2);
            })

        }
        else if (type == 'excel')
        {
            response = angular.copy(aggregateUsageInfo);
            responseUser = angular.copy(detailedUsageInfo);
        }

        $.ajax({
            url: services.UserManagementExport,
            data: '{"exportType": "' + type + '", "response": "' + escape(JSON.stringify(response)) + '","userData": "' + escape(JSON.stringify(responseUser)) + '"}',
            method: callsType.Post,
            contentType: "application/json",
            //processData: false,
            success: function (response) {
                if (response != "Error") {
                    window.location.href = services.DownloadFile + encodeURIComponent(response);
                    showBackgroundShadow(false, false);
                }
                else {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }

            },
            error: function (xhr, status, error) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

}])

.controller('User-Management-Controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {

    $scope.Type = 1;

    $http({
        method: callsType.Get,
        url: services.LoadUserManagementData
    }).then(function successCallback(response) {
        userList = response.data[0];
        groupList = response.data[1];
        userGroupMap = response.data[2];
        detailedUsageInfo = response.data[3];
        aggregateUsageInfo = response.data[4];
        $scope.Users = angular.copy(userList);
        $scope.dataList = angular.copy(userList);
        $scope.GroupsList = angular.copy(groupList);
        $scope.UserGroupMap = angular.copy(userGroupMap);
        $scope.filteredDataList = $scope.dataList.slice($scope.userBegin, $scope.userEnd).select("UserID");
        $scope.filteredGroupList = $scope.GroupsList.slice($scope.groupBegin, $scope.groupEnd).select("GroupName");
        showBackgroundShadow(false, false);
    }, function (data) {
    });
    //pagination code start

    $timeout(function () {
        $scope.dataList = angular.copy(userList);
        $scope.currentPage = 1
        $scope.numPerPage = 8,
        $scope.maxSize = 5;
        $scope.filteredDataList = $scope.dataList.slice(0, $scope.numPerPage).select("UserID");

        $scope.GroupsList = angular.copy(groupList);
        $scope.currentGroupPage = 1;
        $scope.filteredGroupList = $scope.GroupsList.slice(0, $scope.numPerPage).select("GroupName");
    }, 1000)


    $scope.numPages = function () {
        if ($scope.dataList != undefined && $scope.dataList.length > 0)
            return Math.ceil($scope.dataList.length / $scope.numPerPage);
        return;
    };

    $scope.numGroupPages = function () {
        if ($scope.GroupsList != undefined && $scope.GroupsList.length > 0)
            return Math.ceil($scope.GroupsList.length / $scope.numPerPage);
        return;
    };

    $scope.setPage = function () {
        pageNo = $("#go-to-box.user").val();
        if (pageNo <= Math.ceil($scope.dataList.length / $scope.numPerPage))
            $scope.currentPage = parseInt(pageNo);
    };
    $scope.setGroupPage = function () {
        pageNo = $("#go-to-box.group").val();
        if (pageNo <= Math.ceil($scope.GroupsList.length / $scope.numPerPage))
            $scope.currentGroupPage = parseInt(pageNo);
    };
    $scope.$watch('currentPage + numPerPage', function () {
        $scope.userBegin = (($scope.currentPage - 1) * $scope.numPerPage), $scope.userEnd = $scope.userBegin + $scope.numPerPage;
        if ($scope.dataList != undefined && $scope.dataList.length > 0)
            $scope.filteredDataList = $scope.dataList.slice($scope.userBegin, $scope.userEnd).select("UserID");
    });
    $scope.$watch('currentGroupPage + numPerPage', function () {
        $scope.groupBegin = (($scope.currentGroupPage - 1) * $scope.numPerPage), $scope.groupEnd = $scope.groupBegin + $scope.numPerPage;
        if ($scope.GroupsList != undefined && $scope.GroupsList.length > 0)
            $scope.filteredGroupList = $scope.GroupsList.slice($scope.groupBegin, $scope.groupEnd).select("GroupName");
    });

    //pagination code end


    $scope.userToAdd = [];
    $scope.userToEdit = [];
    $scope.usersAddedToGroupList = [];
    $scope.usersSelectedForGroup = [];
    $scope.usersSelectedToRemoveFromGroup = [];
    $scope.UsersNotAddedToGroup = [];
    $scope.BatchUserList = [];
    $scope.DeleteBatchUserList = [];
    $scope.usersSelected = [];
    $scope.selectedRole = "";
    $scope.newGroupName = "";
    $scope.HeaderName = "MANAGE USERS";



    $scope.customPopup['visible'] = false;
    $scope.crosstabLeftPanel = true;
    //  angular.element('.userManagementHeader .headerText').html(angular.element('.headerButton').eq(0).html().trim())

    $scope.hideLeftPanel = function ($event) {
        if (!$scope.leftMenuIsHidden)
            $scope.leftPanelToggle($event);
        if (!$scope.ModuleIsHidden)
            $scope.ModulePanelToggle();
        //$scope.showSettings = false;
        angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
        angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
    }

    $scope.selectHeader = function (type) {
        $scope.Type = type;
        angular.element(document.querySelectorAll('.headerButton')).removeClass('active');
        angular.element(document.querySelectorAll('.headerButton:nth-child(' + type + ')')).addClass('active');



        if (type == 1) {
            angular.element(document.getElementById("manageUsersContainer")).show();
            angular.element(document.getElementById("manageBatchUsersContainer")).hide();
            angular.element(document.getElementById("groupsContainer")).hide();
            $scope.HeaderName = "MANAGE USERS";
        }
        else if (type == 2) {
            angular.element(document.getElementById("manageUsersContainer")).hide();
            angular.element(document.getElementById("manageBatchUsersContainer")).show();
            angular.element(document.getElementById("groupsContainer")).hide();
            $scope.HeaderName = "MANAGE BATCH USERS";

        }
        else {
            angular.element(document.getElementById("manageUsersContainer")).hide();
            angular.element(document.getElementById("manageBatchUsersContainer")).hide();
            angular.element(document.getElementById("groupsContainer")).show();
            $scope.HeaderName = "GROUPS";
        }
        if ($scope.searchText != undefined)
            $scope.searchText.text = "";
    }

    $scope.addUserData = function () {
        angular.element(document.getElementsByClassName('DN')).show();
        angular.element(document.getElementById('addUserPopupContainer')).show();
        $scope.resetPopup();

    }

    function validate(email) {

        if (email.match(/[a-zA-Z0-9-._']+@+[a-zA-Z0-9-._']/) != null)
            return true;

        return false;


    }

    $scope.addUser = function (emailIds) {
        $scope.BatchUserList = [];
        if (emailIds != undefined) {
            emailIds = emailIds.splice(3);
            emails = emailIds.select("__EMPTY").distinct();

            let resultList = [];
            $scope.findLength = 0;
            angular.forEach(emails, function (a, b) {
                if (validate(a)) {
                    $scope.findLength = $scope.findLength + 1;
                    $scope.findData(a, emailIds);
                }
                else
                    $scope.BatchUserList.push({ 'Email': a, 'Added': 'N', 'Reason': 'Invalid Email' });

            })


            if ($scope.findLength == 0)
                show_popup("Alert", "Uploaded successfully");

        }
        else {
            addBatchUsers();
        }
    }

    function getUsersList(emailIds) {
        resultList = $scope.results;
        angular.forEach(resultList, function (a, b) {

            if (a.IsValid != undefined && a.IsValid == false) {

            }
            else {
                a.Role = emailIds.filter(function (e) { return e.__EMPTY.toUpperCase() == a.Email.toUpperCase() })[0].__EMPTY_1;
                if (emailIds.filter(function (e) { return e.__EMPTY.toUpperCase() == a.Email.toUpperCase() })[0].__EMPTY_2 != undefined) {
                    groupTemp = emailIds.filter(function (e) { return e.__EMPTY.toUpperCase() == a.Email.toUpperCase() })[0].__EMPTY_2.split(",");
                    GroupId = "";
                    angular.forEach(groupTemp, function (c, d) {
                        GroupId += $scope.GroupsList.filter(function (e) { return e.GroupName.toUpperCase() == c.trim().toUpperCase() })[0].GroupId + ", "
                    })
                    a.GroupId = GroupId.substr(0, GroupId.length - 2);
                }
            }

        })
        return resultList;
    }

    function addBatchUsers(resultList, emailIds) {
        showBackgroundShadow(true, true);
        let count = 0;
        if ($scope.userToAdd.length == 0)
            show_popup("Alert", "Select the user");
        else
            angular.forEach($scope.userToAdd, function (a, b) {
                delete a.$$hashKey;
                if (emailIds != undefined)
                    request = '{"user": \'' + escape(JSON.stringify(a)) + ' \', "role":  \'' + resultList[b].Role + ' \', "group":  \'' + resultList[b].GroupId + ' \'}';
                else
                    request = '{"user": \'' + escape(JSON.stringify(a)) + ' \', "role":  \'' + $scope.selectedRole + ' \', "group":  \'' + $scope.selectedGroupId + ' \'}';

                if ($scope.selectedRole == "" && emailIds == undefined)
                    show_popup("Alert", "Role is mandatory");
                else if (emailIds != undefined && resultList[b].Role == undefined)
                    $scope.BatchUserList.push({ 'Email': a.Email, 'Added': 'N', 'Reason': 'Role is mandatory' });
                else if (emailIds != undefined && resultList[b].IsValid == false)
                    $scope.BatchUserList.push({ 'Email': a.Email, 'Added': 'N', 'Reason': 'User does not exist' });
                else {
                    $.ajax({
                        url: services.AddUser,
                        data: request,
                        method: callsType.Post,
                        contentType: "application/json",
                        success: function (response) {
                            if (response != "False") {
                                count++;
                                if (emailIds != undefined)
                                    $scope.BatchUserList.push({ 'Email': a.Email, 'Added': 'Y', 'Reason': '' })
                                if (count == b + 1) {
                                    $scope.userToAdd = [];
                                    $scope.updatedScopeList();
                                    $scope.resetPopup();
                                }

                                $scope.closePopup();
                                if (emailIds == undefined)
                                    show_popup("Alert", "User Added Successfully");

                            }
                            else {

                                if (emailIds == undefined) {
                                    show_popup("Alert", customMessages.UserAlreadyExist);
                                    return false;
                                }
                                else
                                    $scope.BatchUserList.push({ 'Email': a.Email, 'Added': 'N', 'Reason': 'User Already Exist' })
                            }

                        },
                        error: function (xhr, status, error) {
                            show_popup("Alert", customMessages.Error);
                            return false;
                        }
                    });

                }
            })
    }

    $scope.addGroup = function () {
        angular.element(document.getElementsByClassName('DN')).show();

        angular.element(document.getElementById('addGroupPopupContainer')).show();
        $scope.resetPopup();
        $scope.Users = $scope.Users.filter(function (e) { return e.IsActive });
        SetScroll($('.users-group-list'), "#D31245", 0, 0, 0, 0, 3, false);
    }

    $scope.closePopup = function () {
        angular.element(document.getElementsByClassName('DN')).hide();
        angular.element(document.getElementsByClassName('popupContainer')).hide();
    }

    $scope.showDropdownList = function (obj) {
        let flag = angular.element(document.getElementById(obj.target.parentNode.id)).parent().find('.dropdown-list').css('display') == 'none';
        angular.element(document.querySelectorAll('.dropdown-list')).hide();
        if (flag)
            angular.element(document.getElementById(obj.target.parentNode.id)).parent().find('.dropdown-list').show();
        else
            angular.element(document.getElementById(obj.target.parentNode.id)).parent().find('.dropdown-list').hide();
        SetScroll($('.group-dropdown .dropdown-list'), "#D31245", 0, 0, 0, 0, 3, false);
    }

    $scope.selectRolesDropdownOption = function (obj, role) {

        angular.element(document.querySelectorAll('.role-dropdown .radio-icon')).removeClass('active');
        angular.element(document.querySelectorAll('.role-dropdown .dropdown-list-values')).removeClass('active');
        angular.element(obj.currentTarget).find('.radio-icon').addClass('active');
        angular.element(obj.currentTarget).find('.dropdown-list-values').addClass('active');

        $scope.Roles.filter(function (e) { return e.isSelected = false; });
        $scope.Roles.filter(function (e) { return e.role == role.role })[0].isSelected = true;
        $scope.selectedRole = role.role;
        //   angular.element(document.querySelectorAll('.dropdown-list')).hide();
    }

    $scope.selectStatusDropdownOption = function (obj, status) {
        angular.element(document.querySelectorAll('#status-container .radio-icon')).removeClass('active');
        angular.element(document.querySelectorAll('#status-container .dropdown-list-values')).removeClass('active');
        angular.element(obj.currentTarget).find('.radio-icon').addClass('active');
        angular.element(obj.currentTarget).find('.dropdown-list-values').addClass('active');

        $scope.Status.filter(function (e) { return e.isSelected = false; });
        $scope.Status.filter(function (e) { return e.status == status.status })[0].isSelected = true;

        $scope.selectedStatus = status.status;

    }

    $scope.selectGroupDropdownOption = function (obj, group) {

        if (angular.element(obj.currentTarget).find('.checkbox-icon').hasClass("active")) {
            angular.element(obj.currentTarget).find('.checkbox-icon').removeClass("active");
            angular.element(obj.currentTarget).find('.dropdown-list-values').removeClass('active');
        } else {
            angular.element(obj.currentTarget).find('.checkbox-icon').addClass("active");
            angular.element(obj.currentTarget).find('.dropdown-list-values').addClass('active');
        }

        let groupName = "";
        let GroupId = "";
        $scope.GroupsList.filter(function (e) { return e.isSelected = false; });
        angular.forEach(angular.element(obj.currentTarget.parentElement).find('.dropdown-list-values.active'), function (a, b) {
            groupName += angular.element(a).text().trim() + ", ";
            $scope.GroupsList.filter(function (e) { return e.GroupName == angular.element(a).text().trim() })[0].isSelected = true;
            GroupId += $scope.GroupsList.filter(function (e) { return e.GroupName == angular.element(a).text().trim() })[0].GroupId + ", "
        })

        $scope.selectedGroup = groupName.substr(0, groupName.length - 2);
        $scope.selectedGroupId = GroupId.substr(0, GroupId.length - 2)

    }


    $scope.sortTable = function (obj) {
        if ($scope.SortOrder == undefined)
            $scope.SortOrder = 1;
        else
            $scope.SortOrder = !$scope.SortOrder;
        angular.element(obj.currentTarget.parentElement.parentElement.parentElement).find(".heading-icon").removeClass("active")
        angular.element(obj.currentTarget).addClass("active");
        let sortName = angular.element(obj.currentTarget.parentElement.parentElement).find(".heading-name").text().trim();
        if (sortName == "ROLE") {
            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.Role <= b.Role)
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.Role <= b.Role)
                        return 1;
                    else
                        return -1;
                });
        }
        else if (sortName == "NAME") {
            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.UserName.toUpperCase() <= b.UserName.toUpperCase())
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.UserName.toUpperCase() <= b.UserName.toUpperCase())
                        return 1;
                    else
                        return -1;
                });
        }
        else if (sortName == "DATE CREATED") {

            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    aDate = a.DateCreated.split(" ")[0].split("/");
                    bDate = b.DateCreated.split(" ")[0].split("/");
                    aTime = a.DateCreated.split(" ")[1].split(":");
                    bTime = b.DateCreated.split(" ")[1].split(":");
                    return new Date(aDate[2], aDate[0] - 1, aDate[1], aTime[0], aTime[1], aTime[2]) - new Date(bDate[2], bDate[0] - 1, bDate[1], bTime[0], +bTime[1], bTime[2])
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    aDate = a.DateCreated.split(" ")[0].split("/");
                    bDate = b.DateCreated.split(" ")[0].split("/");
                    aTime = a.DateCreated.split(" ")[1].split(":");
                    bTime = b.DateCreated.split(" ")[1].split(":");
                    return new Date(bDate[2], bDate[0] - 1, bDate[1], bTime[0], +bTime[1], bTime[2]) - new Date(aDate[2], aDate[0] - 1, aDate[1], aTime[0], aTime[1], aTime[2])
                });


        }
        else if (sortName == "USER ID") {
            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.UserID <= b.UserID)
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.UserID <= b.UserID)
                        return 1;
                    else
                        return -1;
                });
        }
        else if (sortName == "EMAIL") {
            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.Email.toUpperCase() <= b.Email.toUpperCase())
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.Email.toUpperCase() <= b.Email.toUpperCase())
                        return 1;
                    else
                        return -1;
                });
        }
        else if (sortName == "DEPARTMENT") {
            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.Department.toUpperCase() <= b.Department.toUpperCase())
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.Department.toUpperCase() <= b.Department.toUpperCase())
                        return 1;
                    else
                        return -1;
                });
        }
        else if (sortName == "USER STATUS") {
            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.IsActive <= b.IsActive)
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.IsActive <= b.IsActive)
                        return 1;
                    else
                        return -1;
                });
        }
        else if (sortName == "LAST ACTIVITY DATE") {
            if ($scope.SortOrder)
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.LastActivityDate <= b.LastActivityDate)
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.dataList = $scope.dataList.sort(function (a, b) {
                    if (a.LastActivityDate <= b.LastActivityDate)
                        return 1;
                    else
                        return -1;
                });
        }

        $scope.filteredDataList = $scope.dataList.slice($scope.userBegin, $scope.userEnd).select("UserID");



    }


    $scope.sortGroupTable = function (obj) {
        if ($scope.GroupSortOrder == undefined)
            $scope.GroupSortOrder = 1;
        else
            $scope.GroupSortOrder = !$scope.GroupSortOrder;
        angular.element(obj.currentTarget.parentElement.parentElement.parentElement).find(".heading-icon").removeClass("active")
        angular.element(obj.currentTarget).addClass("active");
        let sortName = angular.element(obj.currentTarget.parentElement.parentElement).find(".heading-name").text().trim();

        if (sortName == "DATE CREATED") {
            if ($scope.GroupSortOrder)
                $scope.GroupsList = $scope.GroupsList.sort(function (a, b) {
                    aDate = a.DateCreated.split(" ")[0].split("/");
                    bDate = b.DateCreated.split(" ")[0].split("/");
                    aTime = a.DateCreated.split(" ")[1].split(":");
                    bTime = b.DateCreated.split(" ")[1].split(":");
                    return new Date(aDate[2], aDate[0] - 1, aDate[1], aTime[0], aTime[1], aTime[2]) - new Date(bDate[2], bDate[0] - 1, bDate[1], bTime[0], +bTime[1], bTime[2])
                });
            else
                $scope.GroupsList = $scope.GroupsList.sort(function (a, b) {
                    aDate = a.DateCreated.split(" ")[0].split("/");
                    bDate = b.DateCreated.split(" ")[0].split("/");
                    aTime = a.DateCreated.split(" ")[1].split(":");
                    bTime = b.DateCreated.split(" ")[1].split(":");
                    return new Date(bDate[2], bDate[0] - 1, bDate[1], bTime[0], +bTime[1], bTime[2]) - new Date(aDate[2], aDate[0] - 1, aDate[1], aTime[0], aTime[1], aTime[2])
                });
        }
        else if (sortName == "GROUP NAME") {
            if ($scope.GroupSortOrder)
                $scope.GroupsList = $scope.GroupsList.sort(function (a, b) {
                    if (a.GroupName.toUpperCase() <= b.GroupName.toUpperCase())
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.GroupsList = $scope.GroupsList.sort(function (a, b) {
                    if (a.GroupName.toUpperCase() <= b.GroupName.toUpperCase())
                        return 1;
                    else
                        return -1;
                });

        }
        else if (sortName == "CREATED BY") {
            if ($scope.GroupSortOrder)
                $scope.GroupsList = $scope.GroupsList.sort(function (a, b) {
                    if (a.CreatedBy.toUpperCase() <= b.CreatedBy.toUpperCase())
                        return -1;
                    else
                        return 1;
                });
            else
                $scope.GroupsList = $scope.GroupsList.sort(function (a, b) {
                    if (a.CreatedBy.toUpperCase() <= b.CreatedBy.toUpperCase())
                        return 1;
                    else
                        return -1;
                });

        }

        $scope.filteredGroupList = $scope.GroupsList.slice($scope.groupBegin, $scope.groupEnd).select("GroupName");


    }

    $scope.editUserData = function (obj) {
        angular.element(document.getElementsByClassName('DN')).show();
        //angular.element(document.querySelectorAll('.role-dropdown .radio-icon')).removeClass('active');
        //angular.element(document.querySelectorAll('.role-dropdown .dropdown-list-values')).removeClass('active');
        angular.element(document.querySelectorAll('.dropdown-list')).hide();

        if (obj.target.parentNode.parentNode.parentNode.classList[1] == 'user-table') {

            $scope.Roles.filter(function (e) { return e.isSelected = false });
            $scope.Status.filter(function (e) { return e.isSelected = false });
            $scope.GroupsList.filter(function (e) { return e.isSelected = false });

            var selectedUserDetails = $scope.dataList.filter(function (users) { return users.UserID == obj.target.getAttribute("data-id") })
            $scope.userToEdit = selectedUserDetails[0];
            $scope.selectedUsername = selectedUserDetails[0].UserName;
            $scope.selectedEmail = selectedUserDetails[0].Email;
            $scope.selectedRole = selectedUserDetails[0].Role;
            $scope.selectedGroup = $scope.UserGroupMap.filter(function (e) { return selectedUserDetails[0].UserID == e.UserId });
            GroupName = "";
            GroupId = "";
            angular.forEach($scope.selectedGroup, function (a, b) {
                $scope.GroupsList.filter(function (e) { return e.GroupId == a.GroupId })[0].isSelected = true;
                GroupName += $scope.GroupsList.filter(function (e) { return e.GroupId == a.GroupId })[0].GroupName + ", "
                GroupId += $scope.GroupsList.filter(function (e) { return e.GroupId == a.GroupId })[0].GroupId + ", "
            })
            $scope.selectedGroup = GroupName.substr(0, GroupName.length - 2);
            $scope.selectedGroupId = GroupId.substr(0, GroupId.length - 2);
            $scope.selectedStatus = selectedUserDetails[0].IsActive == true ? 'Active' : 'Inactive';

            $scope.Roles.filter(function (e) { return e.role == selectedUserDetails[0].Role })[0].isSelected = true;
            $scope.Status.filter(function (e) { return e.status == $scope.selectedStatus })[0].isSelected = true;

            angular.element(document.getElementById('editUserPopupContainer')).show();
        }

    }

    $scope.editUser = function (obj) {
        $.ajax({
            url: services.EditUser,
            data: '{"user": \'' + JSON.stringify($scope.userToEdit) + '\', "role":  \'' + $scope.selectedRole + '\', "group":  \'' + $scope.selectedGroupId + '\', "status":  \'' + $scope.selectedStatus + '\'}',
            method: callsType.Post,
            contentType: "application/json",
            success: function (response) {
                if (response != "False") {
                    $timeout(function () {
                        $scope.updatedScopeList();
                        showBackgroundShadow(false, false);
                        $scope.closePopup();
                        show_popup("Alert", "User Edited Successfully");
                    })
                }
                else {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }

            },
            error: function (xhr, status, error) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

    $scope.deleteUserData = function (obj, user, flag) {
        angular.element(document.getElementsByClassName('DN')).show();
        if (flag == 1)
            angular.element(document.getElementsByClassName('hardDeleteUserPopupContainer')).show();
        else
            angular.element(document.getElementsByClassName('deleteUserPopupContainer')).show();
        if (obj.currentTarget.parentElement.parentElement.parentElement.classList[1] == "user-table")
            $scope.userToDelete = user;
        else
            $scope.groupToDelete = user;
    }

    $scope.deleteUser = function (obj, emailIds) {
        showBackgroundShadow(true, true);
        $scope.DeleteBatchUserList = [];
        var email = "";
        if (emailIds != undefined) {
            emailIds = emailIds.splice(2);

            angular.forEach(emailIds, function (a, b) {
                let index = $scope.dataList.findIndex(function (e) { return e.Email.toUpperCase() == a.__EMPTY.toUpperCase() });

                if (index > -1) {
                    if (!$scope.dataList[index].IsActive)
                        $scope.DeleteBatchUserList.push({ 'Email': a.__EMPTY, 'Deleted': 'N', 'Reason': 'User already inactive' });
                    else
                        $scope.DeleteBatchUserList.push({ 'Email': a.__EMPTY, 'Deleted': 'Y', 'Reason': '' });
                }
                else if (!validate(a.__EMPTY))
                    $scope.DeleteBatchUserList.push({ 'Email': a.__EMPTY, 'Deleted': 'N', 'Reason': 'Invalid Email' });
                else {
                    $scope.DeleteBatchUserList.push({ 'Email': a.__EMPTY, 'Deleted': 'N', 'Reason': 'User does not exist' });
                }
            })
            email = emailIds.select("__EMPTY").distinct().join(",");
        }
        else
            email = $scope.userToDelete.Email;
        $.ajax({
            url: services.DeleteUser,
            data: '{"email": "' + email + '","flag":0}',
            method: callsType.Post,
            contentType: "application/json",
            //processData: false,
            success: function (response) {
                if (response != "Error") {
                    $timeout(function () {
                        $scope.updatedScopeList();
                        showBackgroundShadow(false, false);
                        if (emailIds != undefined)
                            show_popup("Alert", "Uploaded successfully");
                        $scope.closePopup();
                    })
                }
                else {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }

            },
            error: function (xhr, status, error) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

    $scope.hardDeleteUser = function (obj, emailIds) {
        showBackgroundShadow(true, true);
        $scope.DeleteBatchUserList = [];
        var email = $scope.userToDelete.Email;
        $.ajax({
            url: services.DeleteUser,
            data: '{"email": "' + email + '","flag":1}',
            method: callsType.Post,
            contentType: "application/json",
            //processData: false,
            success: function (response) {
                if (response != "Error") {
                    $timeout(function () {
                        $scope.updatedScopeList();
                        show_popup("Alert", "User deleted successfully");
                        $scope.closePopup();
                    })
                }
                else {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }

            },
            error: function (xhr, status, error) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

    $scope.getTrustedHtml = function (item) {
        return $sce.trustAsHtml(item);
    }

    $scope.searchItemClick = function (item, searchText) {

        //   angular.element(document.querySelectorAll('.search-item-container')).hide();
        item = item.replace(new RegExp("<strong>", 'gi'), "").replace(new RegExp("</strong>", 'gi'), "");
        let user = $scope.dataList.filter(function (e) { return e.username.toUpperCase() == item.toUpperCase() });
        //$scope.filteredDataList = user;
        searchText.text = item.toUpperCase();

    }

    $scope.results = [];
    $scope.findData = function (enteredValue, flag) {
        $scope.selectedRole = "";
        $scope.selectedGroup = "";
        $scope.selectedGroupId = "";
        var enteredText = enteredValue;
        $scope.userToAdd = [];
        angular.element(document.querySelectorAll('.role-dropdown .radio-icon')).removeClass('active');
        angular.element(document.querySelectorAll('.role-dropdown .dropdown-list-values')).removeClass('active');
        angular.element(document.querySelectorAll('.group-dropdown .checkbox-icon')).removeClass('active');
        angular.element(document.querySelectorAll('.group-dropdown .dropdown-list-values')).removeClass('active');
        showBackgroundShadow(true, true);
        if (enteredValue == "" || enteredValue == undefined || enteredValue == null || enteredValue.length < 3) {
            $scope.results = [];

            showBackgroundShadow(false, false);
        }

        else {
            //let retList = $scope.dataList.filter(function (e) { return e.email.toUpperCase().indexOf(enteredValue.toUpperCase()) > -1 });
            //$scope.results = retList;
            $.ajax({
                url: services.SearchUser,
                data: '{"name": "' + enteredValue + '"}',
                method: callsType.Post,
                contentType: "application/json",
                //processData: false,
                success: function (response) {
                    if (response != "Error") {
                        $timeout(function () {
                            if (response[0][0] != undefined && flag) {
                                $scope.results.push(response[0][0]);

                            }
                            else if (flag == undefined) {
                                $scope.results = response[0];
                                showBackgroundShadow(false, false);
                            }
                            else if (response[0].length == 0) {
                                $scope.results.push({
                                    "BusinessUnit": "",
                                    "DateCreated": null,
                                    "Department": "",
                                    "Email": enteredText,
                                    "Id": null,
                                    "IsActive": false,
                                    "LastActivityDate": null,
                                    "Role": "",
                                    "UserID": "",
                                    "UserName": "", "IsValid": false
                                });
                            }

                            if (flag != undefined && $scope.results.length == $scope.findLength) {
                                resultList = getUsersList(flag);
                                $scope.userToAdd = angular.copy(resultList);
                                delete $scope.userToAdd.Role;
                                delete $scope.userToAdd.GroupId;
                                delete $scope.userToAdd.Role;
                                delete $scope.userToAdd.$$hashKey;
                                addBatchUsers(resultList, flag);
                                $scope.results = [];
                                showBackgroundShadow(false, false);
                                show_popup("Alert", "Uploaded successfully");
                            }
                            //else if(response[0].length==0)
                            //{
                            //    $scope.BatchUserList.push({ 'Email': enteredValue, 'Added': 'N', 'Reason': 'Invalid Email' });
                            //}

                        }, 100)
                    }
                    else {
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }

                },
                error: function (xhr, status, error) {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }
            });


        }

        SetScroll($('.data-container-list'), "#D31245", 0, 0, 0, 0, 3, false);
    };

    $scope.selectUser = function (obj, user) {
        $scope.userToAdd = [user];
        angular.element(document.querySelectorAll('.data-container .radio-icon')).removeClass('active');
        angular.element(obj.currentTarget).addClass('active');
    }

    $scope.selectUsersForGroup = function (obj, user) {
        if (!angular.element(obj.currentTarget).find('.checkbox-icon').hasClass("active")) {
            angular.element(obj.currentTarget).find('.checkbox-icon').addClass("active");
            angular.element(obj.currentTarget).find('.username-list').addClass("active");
            $scope.usersSelectedForGroup.push(user);
        }
        else {
            angular.element(obj.currentTarget).find('.checkbox-icon').removeClass("active");
            angular.element(obj.currentTarget).find('.username-list').removeClass("active");
            $scope.usersSelectedForGroup.splice($scope.usersSelectedForGroup.indexOf(user), 1);
        }

    }

    $scope.selectUsersToRemoveFromGroup = function (obj, user) {
        if (!angular.element(obj.currentTarget).find('.checkbox-icon').hasClass("active")) {
            angular.element(obj.currentTarget).find('.checkbox-icon').addClass("active");
            angular.element(obj.currentTarget).find('.username-list').addClass("active");
            $scope.usersSelectedToRemoveFromGroup.push(user);
        }
        else {
            angular.element(obj.currentTarget).find('.checkbox-icon').removeClass("active");
            angular.element(obj.currentTarget).find('.username-list').removeClass("active");
            $scope.usersSelectedToRemoveFromGroup.splice($scope.usersSelectedToRemoveFromGroup.indexOf(user), 1);
        }
    }

    $scope.addUsersToGroup = function () {

        if ($scope.usersAddedToGroupList.length >= maxUsersAllowedInGroup || ($scope.usersAddedToGroupList.length + $scope.usersSelectedForGroup.length) > maxUsersAllowedInGroup)
            show_popup("Alert", "Maximum 20 users allowed in a group");
        else {
            let userList = $scope.usersSelectedForGroup.select("UserID");

            angular.forEach(userList, function (a, b) {
                index = $scope.Users.findIndex(function (e) { return e.UserID == a });
                $scope.Users.splice(index, 1);
            })


            $scope.usersAddedToGroupList = $scope.usersAddedToGroupList.concat($scope.usersSelectedForGroup);
            $scope.usersSelected = angular.copy(userList);
            $scope.usersSelectedForGroup = [];
        }

    }

    $scope.editUsersToGroup = function () {
        if ($scope.usersAddedToGroupList.length >= maxUsersAllowedInGroup || ($scope.usersAddedToGroupList.length + $scope.usersSelectedForGroup.length) > maxUsersAllowedInGroup)
            show_popup("Alert", "Maximum 20 users allowed in a group");
        else {
            let userList = $scope.usersSelectedForGroup.select("UserID");
            angular.forEach(userList, function (a, b) {
                index = $scope.UsersNotAddedToGroup.findIndex(function (e) { return e.UserID == a });
                $scope.UsersNotAddedToGroup.splice(index, 1);
            })
            $scope.usersAddedToGroupList = $scope.usersAddedToGroupList.concat($scope.usersSelectedForGroup);
            $scope.usersSelected = angular.copy(userList);
            $scope.usersSelectedForGroup = [];
        }

    }

    $scope.removeUsersFromGroup = function () {
        let userList = $scope.usersSelectedToRemoveFromGroup.select("UserID");
        angular.forEach(userList, function (a, b) {
            index = $scope.usersAddedToGroupList.findIndex(function (e) { return e.UserID == a });
            $scope.usersAddedToGroupList.splice(index, 1);
        })
        $scope.Users = $scope.Users.concat($scope.usersSelectedToRemoveFromGroup);
        $scope.usersSelectedToRemoveFromGroup = [];


    }

    $scope.removeEditUsersFromGroup = function () {
        let userList = $scope.usersSelectedToRemoveFromGroup.select("UserID");
        angular.forEach(userList, function (a, b) {
            index = $scope.usersAddedToGroupList.findIndex(function (e) { return e.UserID == a });
            $scope.usersAddedToGroupList.splice(index, 1);
        })
        $scope.UsersNotAddedToGroup = $scope.UsersNotAddedToGroup.concat($scope.usersSelectedToRemoveFromGroup);
        $scope.usersSelectedToRemoveFromGroup = [];


    }

    $scope.saveGroup = function () {
        if ($scope.newGroupName == "" || $scope.newGroupName.length < 3 || $scope.newGroupName.match(/^[A-Za-z][0-9A-Za-z&' '_-][0-9A-Za-z&' '_-]+$/) == null)
            show_popup("Alert", "Please enter valid Group name. Group name must contain atleast 3 characters and cannot contain special character apart from '_', '-','&'.");
        else if ($scope.GroupsList.findIndex(function (e) { return e.GroupName.toUpperCase() == $scope.newGroupName.toUpperCase() }) >= 0)
            show_popup("Alert", "Group name already exist");
        else if ($scope.usersSelected.length == 0)
            show_popup("Alert", "No users selected");
        else if ($scope.usersAddedToGroupList.length == 0)
            show_popup("Alert", "Move selected users to the group user list");
        else if ($scope.usersAddedToGroupList.length < 2)
            show_popup("Alert", "Minimum 2 users are required to create a group");
        else if ($scope.usersAddedToGroupList.length > maxUsersAllowedInGroup)
            show_popup("Alert", "Maximum 20 users allowed in a group");
        else {

            let users = $scope.usersAddedToGroupList.select("UserID");
            UserId = "";
            angular.forEach(users, function (a, b) {
                UserId += a + ","
            })
            users = UserId.substr(0, UserId.length - 1);

            $.ajax({
                url: services.AddGroup,
                data: '{"userlist": "' + users + '", "groupName":  "' + $scope.newGroupName + '"}',
                method: callsType.Post,
                contentType: "application/json",
                //processData: false,
                success: function (response) {
                    if (response != "Error") {
                        $timeout(function () {
                            $scope.updatedScopeList();
                            showBackgroundShadow(false, false);
                            $scope.closePopup();
                            $scope.resetPopup();
                            show_popup("Alert", "Group Added Successfully");
                        })
                    }
                    else {
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }

                },
                error: function (xhr, status, error) {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }
            });
        }
    }

    $scope.editGroupData = function (obj, group) {
        $scope.resetPopup();
        angular.element(document.getElementsByClassName('DN')).show();
        angular.element(document.getElementById('editGroupPopupContainer')).show();
        $scope.newGroupName = group.GroupName;
        let groupId = group.GroupId;
        $scope.selectedGroupId = groupId;
        //   let userNotAdded= userList;
        $scope.UsersNotAddedToGroup = angular.copy(userList);
        $scope.UsersNotAddedToGroup = $scope.UsersNotAddedToGroup.filter(function (e) { return e.IsActive });


        angular.forEach($scope.UserGroupMap.filter(function (e) { return e.GroupId == groupId }), function (a, b) {
            $scope.usersAddedToGroupList = $scope.usersAddedToGroupList.concat($scope.UsersNotAddedToGroup.filter(function (e) { return e.UserID == a.UserId }));
            index = $scope.UsersNotAddedToGroup.findIndex(function (e) { return e.UserID == a.UserId });
            $scope.UsersNotAddedToGroup.splice(index, 1);
        });

        SetScroll($('.users-group-list'), "#D31245", 0, 0, 0, 0, 3, false);
    }

    $scope.editGroup = function () {
        if ($scope.newGroupName == "" || $scope.newGroupName.length < 3 || $scope.newGroupName.match(/^[A-Za-z][0-9A-Za-z&' '_-][0-9A-Za-z&' '_-]+$/) == null)
            show_popup("Alert", "Please enter valid Group name.  Group name must contain atleast 3 characters and cannot contain special character apart from '_', '-','&'.");
        else if ($scope.GroupsList.findIndex(function (e) { return e.GroupName.toUpperCase() == $scope.newGroupName.toUpperCase() && e.GroupId != $scope.selectedGroupId }) >= 0)
            show_popup("Alert", "Group name already exist");
        else if ($scope.usersAddedToGroupList.length == 0)
            show_popup("Alert", "Move users to the group user list");
        else if ($scope.usersAddedToGroupList.length < 2)
            show_popup("Alert", "Minimum 2 users are required to create a group");
        else if ($scope.usersAddedToGroupList.length > maxUsersAllowedInGroup)
            show_popup("Alert", "Maximum 20 users allowed in a group");
        else {

            let userList = $scope.usersAddedToGroupList.select("UserID").join(",");
            $.ajax({
                url: services.EditGroup,
                data: '{"name": \'' + $scope.newGroupName + '\', "userlist":  \'' + userList + '\', "groupId":  \'' + $scope.selectedGroupId + '\'}',
                method: callsType.Post,
                contentType: "application/json",
                success: function (response) {
                    if (response != "False") {
                        $timeout(function () {
                            $scope.updatedScopeList();
                            showBackgroundShadow(false, false);
                            $scope.closePopup();
                            $scope.resetPopup();
                            show_popup("Alert", "Group Edited Successfully");
                        })
                    }
                    else {
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }

                },
                error: function (xhr, status, error) {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }
            });
        }
    }

    $scope.deleteGroup = function () {
        showBackgroundShadow(true, true);
        $.ajax({
            url: services.DeleteGroup,
            data: '{"groupId": ' + parseInt($scope.groupToDelete.GroupId) + '}',
            method: callsType.Post,
            contentType: "application/json",
            //processData: false,
            success: function (response) {
                if (response != "Error") {
                    $timeout(function () {
                        $scope.updatedScopeList();
                        showBackgroundShadow(false, false);
                        $scope.closePopup();
                        show_popup("Alert", "Group Deleted Successfully");
                    })
                }
                else {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }

            },
            error: function (xhr, status, error) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

    $scope.updatedScopeList = function () {
        $http({
            method: callsType.Get,
            url: services.LoadUserManagementData
        }).then(function successCallback(response) {
            userList = response.data[0];
            groupList = response.data[1];
            userGroupMap = response.data[2];
            $scope.Users = angular.copy(userList);
            $scope.dataList = angular.copy(userList);
            $scope.GroupsList = angular.copy(groupList);
            $scope.UserGroupMap = angular.copy(userGroupMap);
            $scope.filteredDataList = $scope.dataList.slice($scope.userBegin, $scope.userEnd).select("UserID");
            $scope.filteredGroupList = $scope.GroupsList.slice($scope.groupBegin, $scope.groupEnd).select("GroupName");
            $timeout(function () {
                if ($scope.Type == 1)
                    $scope.updateFilteredList(searchText);
                else if ($scope.Type == 3)
                    $scope.updateFilteredGroupList(searchText);
                showBackgroundShadow(false, false);
            }, 2000)
        }, function (data) {
        });
    }

    $scope.resetPopup = function () {
        $scope.results = [];
        $scope.selectedRole = "";
        $scope.selectedGroup = "";
        $scope.selectedGroupId = "";
        $scope.searchByEmail = "";
        $scope.newGroupName = "";
        $scope.userToAdd = [];
        $scope.userToEdit = [];
        $scope.usersAddedToGroupList = [];
        $scope.usersSelectedForGroup = [];
        $scope.usersSelectedToRemoveFromGroup = [];
        $scope.UsersNotAddedToGroup = [];
        $scope.Users = angular.copy(userList);
        // $scope.BatchUserList = [];
        //  $scope.DeleteBatchUserList = [];
        angular.element(document.querySelectorAll('.role-dropdown .radio-icon')).removeClass('active');
        angular.element(document.querySelectorAll('.role-dropdown .dropdown-list-values')).removeClass('active');
        angular.element(document.querySelectorAll('.group-dropdown .checkbox-icon')).removeClass('active');
        angular.element(document.querySelectorAll('.group-dropdown .dropdown-list-values')).removeClass('active');
        angular.element(document.querySelectorAll('.dropdown-list')).hide();

    }

    $scope.updateFilteredList = function (searchText) {
        if (searchText != undefined) {
            $scope.filteredDataList = $scope.dataList.filter(function (e) { return e.UserName.toUpperCase().indexOf(searchText.toUpperCase()) > -1 }).select("UserID");
            $("#paginationContainer.user").removeClass("disableSelection");
            if ($scope.filteredDataList.length < $scope.dataList.length)
                $("#paginationContainer.user").addClass("disableSelection");
        }
    }
    $scope.updateFilteredGroupList = function (searchText) {
        if (searchText != undefined) {
            $scope.filteredGroupList = $scope.GroupsList.filter(function (e) { return e.GroupName.toUpperCase().indexOf(searchText.toUpperCase()) > -1 }).select("GroupName");
            $("#paginationContainer.group").removeClass("disableSelection");
            if ($scope.filteredGroupList.length < $scope.GroupsList.length)
                $("#paginationContainer.group").addClass("disableSelection");
        }
    }
}])
.filter("search", function () {
    return function (listItem, args) {
        searchText = args["searchText"];
        //if (angular.element(document.querySelectorAll('.search-item-container')).hide() == true)
        //    angular.element(document.querySelectorAll('.search-item-container')).show();
        if (searchText == "" || searchText == undefined || searchText == null || searchText.length < 3) {
            return [];
        }
        else {
            //let retList;
            //if($('#addUserPopupContainer').is(':visible'))
            //    retList = listItem.select("email").distinct();
            //else
            let retList = listItem.select("username").distinct();
            let filteredList = retList.filter(function (e) { return e.toUpperCase().indexOf(searchText.toUpperCase()) > -1 });
            var newFilteredList = [];
            angular.forEach(filteredList, function (value, index) {
                newFilteredList.push((value.replace(new RegExp(searchText, 'gi'), "<strong>" + searchText + "</strong>")));
            })
            return newFilteredList;
        }
    }
})

function deleteUserExcel(files, flag) {
    let curScope = angular.element(document.getElementsByClassName('containerList')).scope();
    reader = new FileReader();
    reader.onload = function (e) {
        var data = "";
        var bytes = new Uint8Array(e.target.result);
        for (var i = 0; i < bytes.byteLength; i++) {
            data += String.fromCharCode(bytes[i]);
        }
        let emailIds = ProcessExcel(data);

        if (flag == 0) {
            if (!(emailIds[1].__EMPTY == "Enter Email, Role and Group to be Created" && emailIds[2].__EMPTY == "EMAIL*" && emailIds[2].__EMPTY_1 == "ROLE*" && emailIds[2].__EMPTY_2 == "GROUP (Optional)")) {
                show_alert_popup("ALERT", "Invalid File Uploaded");
                return false;
            }
            curScope.addUser(emailIds);
        }
        else {
            if (!(emailIds[0].__EMPTY == "Enter Email of User to be deleted" && emailIds[1].__EMPTY == "EMAIL*")) {
                show_alert_popup("ALERT", "Invalid File Uploaded");
                return false;
            }
            curScope.deleteUser(undefined, emailIds)
        }
    };
    reader.readAsArrayBuffer(files[0]);
    $("#uploadExcel").val("");
}

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];
    emailIds = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
    return emailIds;
};


window.onclick = function (event) {
    if (!angular.element(event.target).parent().hasClass('dropdown-list-values') && !angular.element(event.target).hasClass('dropdownBox')) {
        angular.element(document.querySelectorAll('.dropdown-list')).hide();
        angular.element(document.querySelectorAll('.dropdown-bar')).find('.arrow').removeClass('active');
    }

    if (!angular.element(event.target).hasClass('dropbtn')) {
        var dropdowns = document.getElementsByClassName("settingDropdown");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        document.getElementById('mySettings').style.background = "";
        document.getElementById('mySettings').style.backgroundColor = "";
    }

}