/*设置cookie*/
export function setCookie(cookieName, value, expire) {
    var date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    document.cookie = cookieName + '=' + encodeURI(value) + '; expires=' + date.toISOString();
    console.log(document.cookie);
}
/*获取cookie*/
export function getCookie(cookieName) {
    if (document.cookie.length > 0) {
        var cookieStart = document.cookie.indexOf(cookieName + '=');
        if (cookieStart !== -1) {
            cookieStart = cookieStart + cookieName.length + 1;
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(cookieStart, cookieEnd));
        }
    }
    return '';
}
/*删除cookie*/
export function deleteCookie(cookieName) {
    setCookie(cookieName, '', -1);
}
//# sourceMappingURL=cookie.js.map