// uni-app封装的网络请求 API
// 在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。
// uni 请求
const uniRequest = (data) => {
	// 重新封装请求对象
	let params = {};
	if (data.header) {
		params = {
			url: data.url, //String                     必填	                   开发者服务器接口地址
			data: data.params, //Object/String/ArrayBuffer  非必填     请求的参数      App不支持ArrayBuffer类型
			header: data.header,
			method: data.method, //String  非必填   默认：GET
		}
	} else {
		params = {
			url: data.url, //String                     必填	                   开发者服务器接口地址
			data: data.params, //Object/String/ArrayBuffer  非必填     请求的参数      App不支持ArrayBuffer类型
			method: data.method, //String  非必填   默认：GET
		}
	}

	// 如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			success(res) {
				if (res.data.code === 200 || res.statusCode === 200) {
					resolve(res)
				} else {
					reject(res) // 抛出catch异常
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

// uni 单文件上传
const uniUploadFile = (data) => {
	let params = {};
	params = {
		url: data.url, //String 开发者服务器 url
		...data.data, //data.data 中可能包含 files/filePath、file 、name
		formData: data.formData, //HTTP 请求中其他额外的 form data
	}
	return uni.uploadFile(params);
}

// uni多文件上传
const uniUploadFiles = (data) => {
	let params = {};
	if (data.header) {
		params = {
			url: data.url, //String 开发者服务器 url
			files: data.params, //需要上传的文件列表。 
			header: data.header, //Object 非必填  HTTP 请求 Header, header 中不能设置 Referer。
			formData: data.formData, //HTTP 请求中其他额外的 form data
		}
	} else {
		params = {
			url: data.url, //String 开发者服务器 url
			files: data.params, //需要上传的文件列表。 
			formData: data.formData, //HTTP 请求中其他额外的 form data
		}
	}
	return uni.uploadFile(params);
}

// uni文件下载
const uniDownloadFile = (data) => {
	// success: '', //Function 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
	// fail: '', //Function 接口调用失败的回调函数
	// complete: '', //Function 接口调用结束的回调函数（调用成功、失败都会执行）
	// filePath: '', //string 指定文件下载后存储的路径 (本地路径)  微信小程序（IOS小程序保存到相册需要添加此字段才可以正常保存）
	// timeout: '', //Number 超时时间，单位 ms H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)
	let params = {};
	if (data.header) {
		params = {
			url: data.url, //String 下载资源的 url
			header: data.header, //Object HTTP 请求 Header, header 中不能设置 Referer。
		}
	} else {
		params = {
			url: data.url, //String 下载资源的 url
		}
	}
	return uni.downloadFile(params);
}

const request = (data) => {
	if (data.method == "get") {
		data.method = "GET";
		return uniRequest(data)
	} else if (data.method == "post") {
		data.method = "POST";
		return uniRequest(data);
	} else if (data.method == "put") {
		data.method = "PUT";
		return uniRequest(data);
	} else if (data.method == "delete") {
		data.method = "DELETE";
		return uniRequest(data);
	} else if (data.method == "download") {
		return uniDownloadFile(data);
	} else if (data.method == "upload") {
		return uniUploadFile(data);
	} else if (data.method == "uploadFiles") {
		return uniUploadFiles(data);
	}
}
export default request
