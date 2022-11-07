import dayjs from "dayjs"
/**
 * 日期时间处理
 * @parmam {String} dateString
 * @return {String} 处理后的时间字符串
*/
export function fromCurrentTime(dateString){
	let date = dayjs(dateString).valueOf()
	let currentDate = new Date().getTime();
	let spaceTime = Math.abs(currentDate - date) / 1000; //把相差的毫秒数转换为秒数
	if (spaceTime < 60) {
		// 间隔时间小于1分钟，返回分钟数
		return '刚刚';
	}
	if (spaceTime < 3600) {
		// 间隔时间小于1小时，并且上面的条件都达不到， 返回分钟数
		let time = parseInt(spaceTime / 60)
		return time + '分钟前';
	} else {
		return dayjs(date).format('YYYY-MM-DD hh:mm:ss');
	}
}