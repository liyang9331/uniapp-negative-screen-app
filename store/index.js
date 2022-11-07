// vue 2 模式
// import dayjs from 'dayjs'
import Vue from 'vue'
import Vuex from 'vuex'
// import * as Api_user from '@/api/user.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: false, //是否登录
		userInfo: {},
		wgtinfo: {},
		systemInfo: {},//系统信息
		deviceInfo:{},//设备基础信息
		location: {},
		backgroundImageUrl:"",//系统壁纸路径
		cardTemplateGlobalEvent:[],//卡片模版全局事件
	},
	mutations: {
		setCardTmpGlobalEvent(state,string){
			const key = state.cardTemplateGlobalEvent.findIndex(v=>v==string);
			if(key!=-1){
				// 存在，移除
				state.cardTemplateGlobalEvent = state.cardTemplateGlobalEvent.filter(v=>v!=string);
			}else{
				// 不存在，添加
				state.cardTemplateGlobalEvent = [...state.cardTemplateGlobalEvent,string];
			}
		},
		uploaddict(state, obj) {
			state.dict[obj.type] = obj.data;
		},
		setlocation(state, data) {
			state.location = data;
		},
		// 登录
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
			uni.setStorage({
				key: "userInfo",
				data: userInfo
			})
		},
		// 退出登录
		logout(state) {
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: "userInfo"
			})
			uni.removeStorage({
				key: "user"
			})
		},
		// 更新用户信息
		updateUserInfo(state, data) {
			state.userInfo = Object.assign(state.userInfo, data)
		},
		// 设置App应用信息
		setAppWgtinfo(state, wgtinfo) {
			state.wgtinfo = wgtinfo
		},
		// 设置系统信息
		setSystemInfo(state, systemInfo) {
			state.systemInfo = systemInfo
		},
		// 设置设备基础信息
		setDeviceInfo(state, deviceInfo) {
			state.deviceInfo = deviceInfo
		},
		// 设置系统壁纸路径
		setBackgroundImageUrl(state,url){
			state.backgroundImageUrl = url
		}
	},
	getters: {
		currentColor(state) {
			return state.colorList[state.colorIndex]
		}
	},
	actions: {
		// 获取用户信息
		getUserInfo: function({
			commit,
			state
		}) {
		},
	},
})


export default store
