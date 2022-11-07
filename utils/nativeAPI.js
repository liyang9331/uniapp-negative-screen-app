/**
 * 调用第三方程序打开指定的URL
 * url: ( String ) 必选 要打开的URL地址
 * errorCB: ( OpenErrorCallback ) 可选 打开URL地址失败的回调 
 * identity: ( String ) 可选 指定打开URL地址的程序名称
 */
export function openURL(url, errorCB, identity) {
	plus.runtime.openURL(url, errorCB, identity);
}

/**
 * 使用内置Webview窗口打开URL
 * url: ( String ) 必选 要打开的URL地址
 */
export function openWeb(url) {
	plus.runtime.openWeb(url);
}


/**
 * 调用第三方程序打开指定的文件
 * filepath: ( String ) 必选 打开文件的路径
 * options: ( OpenFileOptions ) 可选 打开文件参数
 * errorCB: ( OpenErrorCallback ) 必选 打开文件失败的回调
 */
export function openFile(filepath, options, errorCB) {
	plus.runtime.openFile(filepath, options, errorCB);
}

// 调用第三方程序
/**
 * appInf: ( ApplicationInf ) 必选 要启动第三方程序的描述信息
 * errorCB: ( LaunchErrorCallback ) 必选 启动第三方程序操作失败的回调函数
 */
export function launchApplication(packageName="",extra={},callback) {
	let appInf = {
			pname: packageName,
			extra: extra
		}
	// 判断第三方程序是否存在
	if(plus.runtime.isApplicationExist({pname:packageName})){
		if (plus.os.name == "Android") {
			plus.runtime.launchApplication(appInf,callback);
		} else if (plus.os.name == "iOS") {
			plus.runtime.launchApplication(appInf,callback);
		}
	}else{
		// 第三方应用程序未安装
		uni.showToast({
			title:"应用未安装",
			icon:"error"
		})
	}

}

/**
 * 应用热重启，重新启动进入首页。
 * 
 */
export function restart() {
	plus.runtime.restart();
}

/**
 * 判断第三方程序是否已存在
 * appInf: ( ApplicationInf ) 必选 要判断第三方程序的描述信息
 * Android平台需要通过设置appInf的pname属性（包名）进行查询。 iOS平台需要通过设置appInf的action属性（Scheme）进行查询，
 * 在iOS9以后需要添加白名单才可查询，在manifest.json文件plus->distribute->apple->urlschemewhitelist节点下添加
 * （如urlschemewhitelist:["weixin"]）.
 */ 
export function isApplicationExist(pname,action) {
	if(plus.runtime.isApplicationExist({pname:pname,action:action})){
		// 已安装
			return true
		}else{
			// 未安装
			return false
		}
}
