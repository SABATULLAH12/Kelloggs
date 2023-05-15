/* helper functions *************************************************/
// Abhay Singh

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (pattern, index) {
        return typeof args[index] != 'undefined' ? args[index] : pattern;
    });
};

String.prototype.commafy = function () {
    return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Object.defineProperty(String.prototype, 'replaceAll', {
    value: function (oldStr, newStr) {
        return this.replace(new RegExp(oldStr, 'g'), newStr);
    }, writable: false, enumerable: false
});


Object.defineProperty(Array.prototype, 'distinct', {
    value: function () {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (arr.indexOf(this[i]) == -1) {
                arr.push(this[i]);
            }
        }
        return arr;
    }, writable: false, enumerable: false
});

Object.defineProperty(Array.prototype, 'where', {
    value: function (comparator) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (comparator(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    }, writable: false, enumerable: false
});

Object.defineProperty(Array.prototype, 'select', {
    value: function (property) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (property in this[i]) {
                arr.push(this[i][property]);
            }
        }
        return arr;
    }, writable: false, enumerable: false
});

Object.defineProperty(Array.prototype, 'transform', {
    value: function (customConstructor) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            arr.push(new customConstructor(this[i]));
        }
        return arr;
    }, writable: false, enumerable: false
});

Object.defineProperty(Array.prototype, 'diff', {
    value: function (a) {
        return this.filter(function (i) { return a.indexOf(i) < 0; });
    }, writable: false, enumerable: false
});

Object.defineProperty(Array.prototype, 'chop', {
    value: function (size) {
        var arr = [];
        var innerArr = [];
        for (var i = 0; i < this.length; i++) {
            innerArr.push(this[i]);

            if (innerArr.length == size || i == this.length - 1) {
                arr.push(innerArr);
                innerArr = [];
            }
        }
        return arr;
    },
    writable: false, enumerable: false
});

Object.defineProperty(Array.prototype, 'top', {
    value: function (count) {
        var returnArr = [];
        for (var i = 0; i < this.length && i < count; i++) {
            returnArr.push(this[i]);
        }
        return returnArr;
    },
    writable: false, enumberable: false
});


/* customized (specific) */
var valueNotEmptyString = function (val) { return val != ''; };
var selectedIsTrue = function (objVal) { return objVal.selected; };
var selectedIsFalse = function (objVal) { return !objVal.selected; };
var not = function (functionObj) { return function (subjVal) { return !functionObj(subjVal); } };
var containsStringContaining = function (partialString) { return function (val) { if (val.toLowerCase().indexOf(partialString.toLowerCase()) != -1) return true; return false; } }
var nameIs = function (name) { return function (eachVal) { return eachVal.name == name; } };

/* for use with Array.reduce | For example: someArray.reduce(toMax) would give the max value from the array */
var toMax = function (pv, cv) { if (isNaN(cv) || isNaN(+cv)) return pv; return +cv > +pv ? cv : pv; };

/* for use with Array.reduce | For example: someArray.reduce(toMax) would give the max value from the array */
var toMin = function (pv, cv) { if (isNaN(cv) || isNaN(+cv)) return pv; return +cv > +pv ? pv : cv; };

/* object converters for UI */
var valueToCheckboxModel = function (val) { this.name = val; this.selected = false; };
