
var ua;
var is_android;
var is_native_android;
var is_linux;

window.onload = function () {

    console.log("hello");

    var messageBox = document.getElementById('message');


    ua = navigator.userAgent;
    is_android = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android') > -1));
    is_native_android = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1));
    is_linux = (ua.indexOf('Linux') > -1);

    document.getElementById('useragent').innerText=navigator.userAgent;
    document.getElementById('is_android').innerText="is_android="+is_android;
    document.getElementById('is_native_android').innerText="is_native_android="+is_native_android;
    document.getElementById('is_linux').innerHTML="is_linux="+is_linux;

};