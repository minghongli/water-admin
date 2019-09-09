import {
	axios
} from '@/utils/request'

const api = {
	user: '/user',
	role: '/role',
	service: '/service',
	permission: '/permission',
	permissionNoPager: '/permission/no-pager',
	orgTree: '/org/tree',
	goods: '/goods',
	addGoods: '/v1/addGoods'
}

// export default api

export function getMemberList(parameter) {
	return axios({
		url: api.service,
		method: 'get',
		params: parameter
	})
}

export function getUserList(parameter) {
	return axios({
		url: api.user,
		method: 'get',
		params: parameter
	})
}

export function getRoleList(parameter) {
	return axios({
		url: api.role,
		method: 'get',
		params: parameter
	})
}

//商品列表
export function getGoodsList(parameter) {
	return axios({
		url: api.user,
		method: 'get',
		params: parameter
	})
}

//添加商品
export function addGood(parameter) {
	return axios({
		url: api.addGoods,
		method: 'post',
		data: parameter
	})
}

export function getServiceList(parameter) {
	return axios({
		url: api.service,
		method: 'get',
		params: parameter
	})
}

export function getPermissions(parameter) {
	return axios({
		url: api.permissionNoPager,
		method: 'get',
		params: parameter
	})
}

export function getOrgTree(parameter) {
	return axios({
		url: api.orgTree,
		method: 'get',
		params: parameter
	})
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
	return axios({
		url: api.service,
		method: parameter.id === 0 ? 'post' : 'put',
		data: parameter
	})
}
