/**
 * 日志系统
 */

// 初始化
export default function LogInit(){
	return log;	
}

// 常规输出
function log(str){
	console.log(uni.dayjs()+":",str)
}