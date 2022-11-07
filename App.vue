<script>
	// 引入自定义原生插件
	import getWallpaper from "@/utils/getWallpaper.js"
	import storage from "@/utils/storage.js"
	import websocket from '@/utils/webSocket.js'
	const getPhone = uni.requireNativePlugin("Get-Phone");
	export default {
		onLaunch: function() {
			uni.log("App Launch");
			// 调用原生插件的异步函数，获取系统壁纸bitmap，高斯模糊处理，保存jpeg到app files/Wallpaper
			getWallpaper();

			function run(phoneNum) {
				const socketURL = "ws://8.142.150.108:8800/push/" + phoneNum;
				websocket({
					onmessage: (res) => {
						uni.$emit("watchWebsocketMessage", res)
					},
					onopen: (res) => {
						// console.log(res)
					},
					socketUrl: socketURL
				})
			}
			// 获取本机手机号码
			const phoneNum = storage.get("phoneNum");
			if (phoneNum != null) {
				run(phoneNum);
			} else {
				getPhone.testAsyncFunc((res) => {
					storage.set("phoneNum", res.phoneNum, 365).then(response => {
						run(res.phoneNum);
					})
				})
			}

			// 获取系统信息
			const systemInfo = uni.getSystemInfoSync();
			// 获取设备基础信息
			const deviceInfo = uni.getDeviceInfo();
			// 全局状态储存
			uni.$store.commit("setSystemInfo", systemInfo);
			uni.$store.commit("setDeviceInfo", deviceInfo);
		},
		onShow: function() {
			uni.log("App Show")
			// 通知含有接口的卡片，更新数据
			uni.$store.state.cardTemplateGlobalEvent.forEach(v => {
				uni.$emit(v)
			})
		},
		onHide: function() {
			uni.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
</style>
