const RegexFormat={
mobile:/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
dateTimeRegex:/\d{2,4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}.?\d+/ig,
dateRegex:/\d{2,4}-\d{1,2}-\d{1,2}/ig,
specialCharectors:/[^a-z]+/ig,
endWithHyphen:/_+$/ig,
digitOnly:/^[0-9]+$/,
email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export default RegexFormat;