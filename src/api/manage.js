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
	addGoods: '/v1/addGoods',
	getOrders: '/v1/getOrders',
	getPendingOrders: '/v1/getPendingOrders',
	getOrderDetail: '/v1/getOrderById',
	getCompany: '/admin/getCompanyUser',
	getCompanyDetail: '/admin/getCompanyDetail',
	updateOrder: '/v1/updateOrder',
	cancelOrder: '/v1/cancelOrder',
	getUserList: ''
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
		url: api.getUserList,
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
//公司用户列表
export function getCompany(parameter) {
	return axios({
		url: api.getCompany,
		method: 'get',
		params: parameter
	})
}
//公司用户列表
export function getCompanyDetail(parameter) {
	return axios({
		url: api.getCompanyDetail,
		method: 'get',
		params: parameter
	})
}
//订单列表
export function getOrders(parameter) {
	return axios({
		url: api.getOrders,
		method: 'get',
		params: parameter
	})
}
//待处理订单列表
export function getPendingOrders(parameter) {
	return axios({
		url: api.getPendingOrders,
		method: 'get',
		params: parameter
	})
}
//订单详情
export function getOrderDetail(parameter) {
	return axios({
		url: api.getOrderDetail + '/' + parameter.id,
		method: 'get',
		params: parameter
	})
}
//更新订单
export function updateOrder(parameter) {
	return axios({
		url: api.updateOrder,
		method: 'post',
		data: parameter
	})
}
//更新订单
export function cancelOrder(parameter) {
	return axios({
		url: api.cancelOrder,
		method: 'post',
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
