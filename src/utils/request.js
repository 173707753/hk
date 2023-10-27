import request from './axios'
import qs from 'qs'
import { baseUrl } from '../config'

export function get(url, param) {
	return new Promise((resolve, reject) => {
		request
			.get(baseUrl + url, {
				params: param,
			})
			.then(
				(response) => {
					resolve(response.data)
				},
				(err) => {
					console.group('>>>>>> 错误信息 >>>>>>')
					console.error(err)
					console.groupEnd()
					reject(err)
				}
			)
			.catch((error) => {
				console.group('>>>>>> 错误信息 >>>>>>')
				console.error(error)
				console.groupEnd()
				reject(error)
			})
	})
}

export function post(url, params) {
	return new Promise((resolve, reject) => {
		request
			.post(baseUrl + url, qs.stringify(params, { skipNulls: true }))
			.then(
				(response) => {
					resolve(response.data)
				},
				(err) => {
					reject(err)
				}
			)
			.catch((error) => {
				console.group('>>>>>> 错误信息 >>>>>>')
				console.error(error)
				console.groupEnd()
				reject(error)
			})
	})
}

export default {
	get,
	post,
}
