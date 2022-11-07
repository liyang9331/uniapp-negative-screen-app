const getWallpaper = uni.requireNativePlugin("Get-Wallpaper");
import requestPermissions from "@/utils/requestPermissions.js"
export default function(){
	function run(){
		// 异步获取系统壁纸，并进行高斯模糊
		getWallpaper.runAsyncFunc(res => {
			// 将图片的路径保存到vuex中
			const imgUrl = plus.io.convertAbsoluteFileSystem(res.url);
			uni.$store.commit("setBackgroundImageUrl", imgUrl)
			// this.bgImgUrl = imgUrl;
		})
	}
	function get(){
		// 获取写入权限
		requestPermissions("android.permission.WRITE_EXTERNAL_STORAGE").then(res => {
			// 获取成功
			run();
		}).catch(err => {
			// 获取失败
			get();
		})
	}
	get();
}