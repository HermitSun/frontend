import Cookies from 'js-cookie'
import { cookieExpires } from '../config/index.ts' // cookie保存的天数

/**
 * @msg: 存取token
 * @param {string} token
 */
export const TOKEN_KEY: string = 'token'
export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return ''
  }
}
export const delToken = () => {
  Cookies.remove(TOKEN_KEY)
}
