/*设置cookie*/
export function setCookie (cookieName: string, value: string, expire: number) {
  let date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = cookieName + '=' + encodeURI(value) + '; expires=' + date.toISOString()
  console.log(document.cookie)
}

/*获取cookie，尽量避免一个cookie的名字是另一个cookie的子串，否则会出现神秘bug*/
export function getCookie (cookieName: string) {
  if (document.cookie.length > 0) {
    let cookieStart = document.cookie.indexOf(cookieName + '=')
    if (cookieStart !== -1) {
      cookieStart = cookieStart + cookieName.length + 1
      let cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      return decodeURI(document.cookie.substring(cookieStart, cookieEnd))
    }
  }
  return ''
}

/*删除cookie*/
export function deleteCookie (cookieName: string) {
  setCookie(cookieName, '', -1)
}
