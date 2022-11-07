/**
 * 
 * @param {Object} obj 对象
 * 去除对象属性值为特点值的属性
 * @return {Blob}
 */
export function objectFilter(obj={},chart=""){
	let newObj = {}
	Object.keys(obj).forEach((item,key)=>{
		if(obj[item]!=chart){
			newObj[item] = obj[item]
		}
	})
	return newObj
}