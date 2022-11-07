import config from "@/config";
import md5 from "blueimp-md5";
export default function(){
	// 生成签名
	const generateAutograph = (pname, autograph) => {
		/**
		 * 包名+固定字符串+前端生成的10位时间戳，MD5加密
			签名 _aop_signature
			时间戳 _aop_strtotime 放到header里面，
			后台根据你传的时间戳以及固定的包名及字符串一起生成签名，然后再比对
		 */
		// 时间戳-秒
		const date = uni.dayjs().unix();
		return {
			aopSignature: md5(pname + autograph + date),
			aopStrtotime: date
		}
	}
	// 拦截请求
	uni.addInterceptor('request', {
		invoke(args) {
			// 添加签名
			try{
				const params = generateAutograph(config.pname,config.autograph);
				if(args.data.hasOwnProperty("isThirdParty") === false){
					// 深拷贝args
					// let cloneDeep = require('lodash.clonedeep');
					// let obj = cloneDeep(args)
					args.header = {...args.header,...params};
					// console.log(args.url)
					args.url = config.baseURL+args.url;
					// 赋值给args
					// args = obj;
					// console.log(args)
				}
			}catch(err){
				
			}
			// console.log(args)
		},
		success(args) {
			// console.log("拦截成功")
			// console.log(args)
		},
		fail(err) {
			// console.log("拦截失败",err)
			// console.log(err)
			// uni.showToast({
			// 	title: err.errMsg,
			// 	icon: 'error'
			// })
		},
		complete(res) {}
	})
	// 拦截文件上传
	uni.addInterceptor('uploadFile', {
		invoke(args) {
		},
		success(args) {
			args.statusCode = args.data.status ? args.data.status : args.statusCode;
			// 状态码
			// 200 400 500
			if (args.statusCode != 200) {
				// 400 500 情况
				uni.showToast({
					title: args.data.message ? args.data.message : args.data.error ? args.data.error : '',
					icon: 'error'
				})
				return false
			}
		},
		fail(err) {},
		complete(res) {}
	})
	
	// 拦截文件下载
	uni.addInterceptor('uploadFile', {
		invoke(args) {
		},
		success(args) {
			args.statusCode = args.data.status ? args.data.status : args.statusCode;
			// 状态码
			// 200 400 500
			if (args.statusCode != 200) {
				// 400 500 情况
				uni.showToast({
					title: args.data.message ? args.data.message : args.data.error ? args.data.error : '',
					icon: 'error'
				})
				return false
			}
		},
		fail(err) {},
		complete(res) {}
	})
}