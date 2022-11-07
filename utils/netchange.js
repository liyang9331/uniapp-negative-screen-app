/**
 * @@return {Boolean} 当前网络环境是否可用
 * 2G以及没有网络，不可用
 */ 
export default function(){
	const nt = plus.networkinfo.getCurrentType();
	let flag = false;
	switch (nt){
		case plus.networkinfo.CONNECTION_ETHERNET:
		case plus.networkinfo.CONNECTION_WIFI:
		// console.log("Switch to Wifi networks!"); 
		flag = true;
		break; 
		case plus.networkinfo.CONNECTION_CELL2G:
		flag = false;
		break;
		case plus.networkinfo.CONNECTION_CELL3G:
		case plus.networkinfo.CONNECTION_CELL4G:
		// console.log("Switch to Cellular networks!");
		flag = true;
		break; 
		default:
		// console.log("Not networks!"); 
		flag = false;
		break;
	}
	return flag;
}