import * as request from '@/utils/request.js';

// 搜索栏接口
export function getSearch (params){
	return request.get('/fyp/mobile/es/search?pageSize=500', params);
}

export function hotWord (params){
	return request.get('/fyp/hotwords/mobile/list', params);
}
// 添加热搜词
export function addHotWords (params){
	return request.get('/fyp/mobile/es/addHotWords', params);
}

// 应用快捷入口接口
export function application (params){
	return request.get('/fyp/application/mobile/list?pageSize=200', params);
}

// 消息入口
export function getInformation (api,params){
	return request.get(`/fyp/notification/mobile/List?pageSize=${api}`, params);
}

// 首页
export function getList (api, params){
	return request.get(`/fyp/notification/mobile/List?pageSize=${api}`, params);
}
// 信息详情页的内容
export function getInformationDetail (notifyId){
	return request.get(`/fyp/notification/getInfo/mobile/${notifyId}`);
}