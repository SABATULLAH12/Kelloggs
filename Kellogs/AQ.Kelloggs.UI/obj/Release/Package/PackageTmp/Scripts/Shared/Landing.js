//var accessList = [{ "Module": "All Modules", "id": 1 }, { "Module": "Snapshot", "id": 2 }, { "Module": "Crosstab", "id": 3 }, { "Module": "Occasion Strategic Postures", "id": 4 }, { "Module": "Correspondence Maps", "id": 5 }, { "Module": "My Dashboard", "id": 6 }, { "Module": "Report Generator", "id": 7 }]

var accessList = [{ "Module": "All Modules", "id": 1, "Name": "All Modules" }, { "Module": "Snapshot", "id": 2, "Name": "Occasion Profile" }, { "Module": "Crosstab", "id": 3, "Name": "Visual Crosstab" }, { "Module": "Occasion Strategic Postures", "id": 4, "Name": "Occasion Strategic Postures" }, { "Module": "Correspondence Maps", "id": 5, "Name": "Correspondence Maps" }, { "Module": "My Dashboard", "id": 6, "Name": "My Dashboard" }, { "Module": "Report Generator", "id": 7, "Name": "Report Generator" }, { "Module": "Performance Dashboard", "id": 9, "Name": "Performance Dashboard" }]


$(document).ready(function () {
    let accessCode = sessionStorage.getItem("Modules").split(",");
    let moduleList = accessList.filter(function (e) { return accessCode.indexOf(e.id.toString()) > -1 });
    let moduleName = [];
    for (var i = 0; i < moduleList.length; i++) {
        moduleName.push(moduleList[i].Module);
    }
    for (var i = 0; i < $("li.collapsed").length; i++) {
        let module = $($("li.collapsed")[i]).attr("name");
        if (module.toUpperCase() == "ADVANCED ANALYTICS") {
            if (moduleName.indexOf("All Modules") == -1) {
                if (moduleName.indexOf("Occasion Strategic Postures") == -1 && moduleName.indexOf("Correspondence Maps") == -1)
                    $($("li.collapsed")[i]).addClass("disableSelection");
                else if (moduleName.indexOf("Occasion Strategic Postures") == -1)
                    $($("li.collapsed")[i]).find("a[title='OCCASION STRATEGIC POSTURES'] .optionName").addClass("disableSelection")
                else if (moduleName.indexOf("Correspondence Maps") == -1)
                    $($("li.collapsed")[i]).find("a[title='CORRESPONDENCE MAPS'] .optionName").addClass("disableSelection")
            }
        }
        else if (!(moduleName.indexOf(module) > -1 || moduleName.indexOf("All Modules") > -1))
            $($("li.collapsed")[i]).addClass("disableSelection");
    }

    var myVal = sessionStorage.getItem("Roles");

    if (myVal == "Admin") {
        document.getElementById('userManageAccess').style.display = 'block';
    } else {
        document.getElementById('userManageAccess').style.display = 'none';
        document.getElementById("myDropdown").style.height = '153px';
    }
})


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById('mySettings').style.background = "none";
    // document.getElementById('mySettings').style.backgroundColor = "white";

}

function myFunction1() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById('mySettings').style.background = "";
    document.getElementById('mySettings').style.backgroundColor = "";

}

function close_Custom_popup() {
    $(document.getElementsByClassName("custom-popup")).removeClass("show_element");
    $(document.getElementsByClassName("samplesize-popup")).removeClass("show_element");
    $(".custom-popup .popup-container .middleAlign").text("");
    showBackgroundShadow(false, false);
    $(document.getElementsByClassName("userguide-popup")).removeClass("show_element");
}


function downloadUserGuide(flag, name) {
    myFunction1();
    var url = window.location.href.split("/");
    if (url[3] == "UserManagement") {
        downloadGuide(8, "");
    }
    else {
        let accessCode = sessionStorage.getItem("Modules").split(",");
        let all = ["All Modules", "Occasion Profile", "Performance Dashboard", "Visual Crosstab", "Occasion Strategic Postures", "Correspondence Maps", "My Dashboard", "Report Generator"];
        let moduleList = accessList.filter(function (e) { return accessCode.indexOf(e.id.toString()) > -1 });
        let moduleName = [];
        for (var i = 0; i < moduleList.length; i++) {
            moduleName.push(moduleList[i].Name);
        }
        var accessibleModuleList = ["All Modules"].concat(moduleName);
        if (moduleName.indexOf("All Modules") > -1)
            accessibleModuleList = all;
        var disableList = $(all).not(accessibleModuleList).get();
        var popupHtml = "";
        show_popup("Download User Guide", '');
        all.forEach(function (a, b) {
            let flag = accessList.filter(function (e) { return e.Name == a })[0].id;
            popupHtml += '<div class="downloadOption ' + (disableList.indexOf(a) > -1 ? "disableSelection" : "") + '" title="' + a + '" style="' + (b == 0 ? 'width:100%' : '') + '">' +
                '<div class="middleAlign" style="position:absolute;"><div class="moduleGuide" onclick="downloadGuide(' + flag + ')" style="' + (a == "All Modules" || a == "Performance Dashboard" ? 'width:100%' : '') + '">' + a + "</div>" + (a != "All Modules" && a != "Performance Dashboard" ? '<div class="playButton border" title="Training Video - ' + a + '" onclick="openAdPopup(' + flag + ')"><div>' : '') + '</div></div>' + '</div>' +
                '</div>';
        })
        $(".popup-container").html(popupHtml);
        $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
        $(".custom-popup:visible .popup-container").css({ "height": ($(".custom-popup:visible").height() / document.documentElement.clientWidth) * 100 + "vw", "max-height": ($(".custom-popup:visible").height() / document.documentElement.clientWidth) * 100 + "vw" });
        angular.element(document.getElementsByClassName('downloadOption')).parent().css({ "overflow-y": "hidden" });
    }
};



// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!$(event.target).hasClass('dropbtn')) {
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

function showOptions() {
    document.getElementById("AdvancedAnalyticsHoverBox").classList.toggle("show");
    document.getElementById("mainTab").classList.toggle("hide");
}

function showInternalOptions() {
    document.getElementById("AdvancedAnalyticsHoverBox").style.display = "none";
    document.getElementById("mainTab").style.display = "block";
}

