import Cookies from 'js-cookie'
import { cookieExpires } from '@/config/index.ts' // cookie保存的天数
import { sha512 } from 'js-sha512'

/**
 * @msg: 存取token
 * @param {string} token
 */

export const STUDENT_TOKEN_KEY: string = encodeURI(sha512('stu_token'))
export const ADMIN_TOKEN_KEY: string = encodeURI(sha512('admin_token'))

export const setStudentToken = (token: string) => {
  Cookies.set(STUDENT_TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const setAdminToken = (token: string) => {
  Cookies.set(ADMIN_TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const getStudentToken = () => {
  const token = Cookies.get(STUDENT_TOKEN_KEY)
  if (token) {
    return token
  } else {
    return ''
  }
}
export const getAdminToken = () => {
  const token = Cookies.get(ADMIN_TOKEN_KEY)
  if (token) {
    return token
  } else {
    return ''
  }
}
export const delToken = () => {
  Cookies.remove(STUDENT_TOKEN_KEY)
  Cookies.remove(ADMIN_TOKEN_KEY)
}
