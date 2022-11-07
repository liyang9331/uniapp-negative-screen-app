import * as request from '@/utils/request.js';
// 栏目相关接口
export function getColumnList (params){
	return request.get('/fyp/column/mobile/list', params);
}