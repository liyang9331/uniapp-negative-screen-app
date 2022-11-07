import App from './App';
import store from './store';

// 初始化日志系统
import loginit from "@/utils/Log.js"
uni.log = loginit();

// 创建并初始化网络请求拦截器
import createdInitInterceptor from  "@/utils/interceptor.js"
createdInitInterceptor();
// 挂载自定义配置文件
// import config from "@/config.js"
// uni.config = config;
import uView from '@/uni_modules/uview-ui';
// 全局挂载 dayjs 时间处理库
import dayjs from "dayjs";
require('dayjs/locale/zh-cn');
var relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime);
dayjs.locale('zh-cn') // use locale globally
uni.dayjs = dayjs;
// 把store挂载到uni下，解决在NVUE原生页面中无法获取store
uni.$store = store

// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
	// 修改$u.config对象的属性 
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		}
		// 其他组件属性配置
		// ......
	}
})

// 在 main.js 中写入以下代码即可
function isPromise(obj) {
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

uni.addInterceptor({
	returnValue(res) {
		if (!isPromise(res)) {
			return res
		}
		return new Promise((resolve, reject) => {
			res.then(res => {
				if (res[0]) {
					reject(res[0])
				} else {
					resolve(res[1])
				}
			})
		})
	}
})


// #ifndef VUE3
import Vue from 'vue';
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.use(uView)
	return {
		app
	}
}
// #endif
