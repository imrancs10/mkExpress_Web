import RegexFormat from "./RegexFormat";
const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];


const common = {
    generateMasterDataCode: (value) => {
        return value.toLowerCase().trim().replaceAll(RegexFormat.specialCharectors, "_").replaceAll(RegexFormat.endWithHyphen, '');
    },
    guid: () => {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },
    defaultIfEmpty: (input, defaultValue) => {
        if (input === undefined || input === null || input === "")
            return defaultValue;
        return input;
    },
    concatClassIfNotEmpty: (input, concatClass, condition) => {
        return condition ? `${input} ${concatClass}` : input;
    },
    formatTableData: (input, action, rowData) => {
        var returnVal = '';
        if (typeof input === 'boolean') {
            returnVal = input.toString();
            if (action?.replace) {

                for (var key in action.replace) {
                    if (key.toLocaleLowerCase() === returnVal.toLocaleLowerCase())
                        returnVal = action.replace[key];
                }
            }
            return returnVal;
        }
        if (action?.replace) {

            for (var key1 in action.replace) {
                if (key1.toLocaleLowerCase() === input.toLocaleLowerCase())
                    input = action.replace[key1];
            }
            return input;
        }

        if (typeof input === 'number') {
            returnVal = input.toString();
            if (action?.decimal) {
                returnVal = parseFloat(input).toFixed(2);
            }
            if (action?.currency) {
                returnVal = returnVal + ' ' + action.currency
            }
            return returnVal;
        }

        if (typeof input !== 'string')
            return input;

        if (action?.image) {
            if (input === undefined || input === "")
                return "No Image";
            return <img style={{ height: "40px", width: "40px", cursor: "pointer" }} src={process.env.REACT_APP_API_URL + input} data-bs-toggle="modal" data-bs-target="#table-image-viewer"></img>
        }
        if (input === common.defaultDate) {
            return returnVal
        }
        if (input.match(RegexFormat.dateTimeRegex) !== null)
            return common.getHtmlDate(input.match(RegexFormat.dateRegex)[0], 'ddmmyyyy');
        if (action?.upperCase) {
            if (input !== undefined && input !== "")
                return input.toUpperCase()
            return input;
        }
        return input;
    },
    getLastDateOfMonth: (month, year) => {
        let currentDate = new Date();
        month = typeof month === "number" ? month + 1 : currentDate.getMonth() + 2;
        year = typeof year === "number" ? year : currentDate.getFullYear();
        if (month > 12) {
            month = 1;
            year += 1;
        }
        let lastDateOfMonth = new Date(`${year}-${month}-01`).setDate(0);
        return new Date(lastDateOfMonth).toDateString();
    },
    getFirstDateOfMonth: (month, year) => {
        let currentDate = new Date();
        month = typeof month === "number" ? month : currentDate.getMonth();
        year = typeof year === "number" ? year : currentDate.getFullYear();
        return new Date(`${year}-${month + 1}-01`).toDateString();
    },
    daysInMonth: (month, year) => {
        return new Date(year, month, 0).getDate();
    },
    getHtmlDate: (date, format = "yyyymmdd") => {
        if (date === undefined)
            return "";
        if (typeof date !== "object") {
            date = new Date(date);
        }
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = (date.getDate()).toString().padStart(2, '0');
        if (format === "yyyymmdd")
            return `${date.getFullYear()}-${month}-${day}`;
        if (format === "ddmmyyyy")
            return `${day}-${month}-${date.getFullYear()}`;

    },
    closePopup: (closeButonId, callback) => {
        closeButonId = closeButonId === undefined || closeButonId === '' ? 'closePopup' : closeButonId;
        const closeButton = document.getElementById(closeButonId);
        closeButton.addEventListener('click', () => {
            if (callback !== undefined && typeof callback === 'function') {
                callback();
            }
        });

        closeButton.click();

    },
    numberRanger: (start, end) => {
        var range = []
        if (isNaN(start) || isNaN(end))
            return range;
        if (end >= start) {
            for (let index = start; index <= end; index++) {
                range.push(index);
            }
        }
        else {
            for (let index = start; index >= end; index--) {
                range.push(index);
            }
        }
        return range;
    },
    numberRangerForDropDown: (start, end) => {
        var range = []
        if (Array.isArray(start)) {
            for (let index = 0; index < start.length; index++) {
                range.push({ id: start[index], value: start[index].toString() });
            }
            return range;
        }
        else {
            if (isNaN(start) || isNaN(end))
                return range;
            for (let index = start; index <= end; index++) {
                range.push({ id: index, value: index.toString() });
            }
            return range;
        }
    },
    monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    defaultIfIsNaN: (input, defaultValue = 0) => {
        return isNaN(input) ? defaultValue : input;
    },
    getDaysInMonth: (year, month) => {
        return new Date(year, month, 0).getDate();
    },
    toUpperCase: (e) => {
        e.target.value = e.target.value.toUpperCase();
    },
    throttling: (callback, wait, args) => {
        var timer = setTimeout(() => {
            callback(args);
            timer = undefined;
        }, wait);
        if (timer)
            return;
    },
    debounce: (func, delay, args) => {
        let debounceTimer
        return function () {
            const context = this
            //const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => func.apply(context, args), delay)
        }
    },
    printDecimal: (number) => {
        number = parseFloat(number);
        if (isNaN(number)) return 0.00
        return number.toFixed(2);

    },
    cloneObject: (obj) => {
        if (obj === undefined || obj === null)
            return obj;
        return JSON.parse(JSON.stringify(obj));
    },
    defaultDate: "0001-01-01T00:00:00",
    inWords: (num) => {
        num = isNaN(parseInt(num)) ? 0 : parseInt(num);
        if ((num = num.toString()).length > 9) return 'overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lac ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
        str += (n[5] != 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
        return str;
    },
    calculatePercent: (amount, percent) => {
        return (amount / 100) * percent;
    },
    getDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    defaultImageUrl: "assets/images/default-image.jpg",
    dropdownArray: (array, withId = false) => {
        return array?.map((ele, index) => {
            var id = ele;
            if (withId === true) {
                id = parseInt(id);
                id = isNaN(id) ? index + 1 : id;
            }
            return { id: id, value: ele }
        });
    },
    removeByAttr: function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    },
    getCurrDate: (isHtml = true) => {
        if (isHtml)
            return common.getHtmlDate(new Date());
        return new Date();
    },
    contactNoEncoder: (contactNo) => {
        return contactNo?.replace('+', '%2B');
    },
    doNothing: (e) => {
        e.preventDefault();
        return false;
    },
    validateGuid:(guid)=>
    {
       return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(guid);
    },
    checkTokenExpiry:(exp)=>{
       return exp < ((new Date().getTime() + 1) / 1000)
    }
}

export { common };