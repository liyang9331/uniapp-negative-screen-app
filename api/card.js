import * as request from '@/utils/request.js';
// 卡片相关接口
export function getCardList (params){
	return request.get('/fyp/card/mobile/list', params);
}