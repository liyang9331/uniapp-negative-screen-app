import * as request from '@/utils/request.js';
// 数据采集相关文档
export function cardClickCollection (params){
	return request.postJson('/fyp/mobile/appclick/add', params);
}