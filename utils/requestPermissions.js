/**
 * 请求权限
 * @param {String} permissionsName 权限名称
 */ 
export default function(permissionsName){
	return new Promise((res, rej) => {
		plus.android.requestPermissions([permissionsName],
			function(e) {
				if (e.deniedAlways.length > 0) { //权限被永久拒绝  
					// 弹出提示框解释为何需要权限，引导用户打开设置页面开启  
					// console.log('权限被永久拒绝' + e.deniedAlways.toString());
					rej();
				}
				if (e.deniedPresent.length > 0) { //权限被临时拒绝  
					// 弹出提示框解释为何需要权限，可再次调用plus.android.requestPermissions申请权限  
					// console.log('权限被临时拒绝' + e.deniedPresent.toString());
					rej();
				}
				if (e.granted.length > 0) { //权限被允许  
					// console.log('权限被允许' + e.granted.toString());
					res();
				}
			},
			function(e) {
				console.log('Request Permissions error:' + JSON.stringify(e));
				rej();
			});
	})
}