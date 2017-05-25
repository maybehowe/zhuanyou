/**
 * JS错误信息记录,需要配置api和app版本
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
    var api = '/base/error?platform=3&app_key=admin',
        appVersion = '1.0.0',
        errorInfo = scriptURI+'['+lineNumber+':'+columnNumber+']---'+errorMessage+'('+String(errorObj)+')',
        postData = { 
            error_info: errorInfo,
            app_version: appVersion
        },  
        postData = (function(obj){ // 转成post需要的字符串.
            var str = ""; 
            for(var prop in obj){
                str += prop + "=" + obj[prop] + "&" 
            }   
            return str;
        })(postData);

    alert(errorInfo);
    return false;

    try{
        var xhr = new XMLHttpRequest();
    }catch(e){
        var xhr = new ActiveXObject('Msxml2.XMLHTTP');
    }   
    xhr.open("POST", api, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
        }   
    };  
    xhr.send(postData);

}
