import { get } from '../request'

//登录
export const login = (data) => get('/api/market/login/login', data)