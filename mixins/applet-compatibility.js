// 小程序兼容处理 混入
let mixin = {
	computed: {
		// 获取当前状态栏的高度
		statusBarHeight(){
			const {
				statusBarHeight = 20
			} = uni.getSystemInfoSync();
			return statusBarHeight
		}
	},
}
export default mixin;