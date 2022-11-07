import uniRequest from "@/utils/uniRequest";

// ------get 方式------
// get方式 application/x-www-form-urlencoded
const get = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "get",
		params: params,
		...configs,
	});
};

// get方式 application/json
const getJson = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "get",
		header: {
			"Content-Type": "application/json",
		},
		params: params,
		...configs,
	});
};

// ------get 方式------

// ------post 方式------
// post方式 application/x-www-form-urlencoded
const post = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		header: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		method: "post",
		params: params,
		...configs,
	});
};

// post方式 application/json
const postJson = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "post",
		header: {
			"Content-Type": "application/json",
		},
		params: params,
		...configs,
	});
};
// post方式 from-data
const postFormdata = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "post",
		header: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		params: params,
		...configs,
	});
};

// ------post 方式------

// ------put 方式------
// put方式 application/x-www-form-urlencoded
const put = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "put",
		params: params,
		...configs,
	});
};

// put方式 application/json
const putJson = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "put",
		header: {
			"Content-Type": "application/json",
		},
		params: params,
		...configs,
	});
};
// ------put 方式------

// ------delete 方式------
// del方式 application/x-www-form-urlencoded
const del = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "delete",
		params: params,
		...configs,
	});
};

// del方式 application/json
const delJson = (url, params = {}, configs = {}) => {
	return uniRequest({
		url: url,
		method: "delete",
		header: {
			"Content-Type": "application/json",
		},
		params: params,
		...configs,
	});
};
// 上传blob
const uploadBlob = (url, data = {}, formData = {}, config = {}) => {
	return uniRequest({
		url: url,
		method: "post",
		params: data,
		formData: formData,
		...config
	});
};
// 上传文件
const upload = (url, data = {}, formData = {}, config = {}) => {
	return uniRequest({
		url: url,
		method: "upload",
		data: data,
		formData: formData,
		...config
	});
};
// 上传文件对象
const uploadFileObject = (url, data = {}, formData = {}, config = {}) => {
	return uniRequest({
		url: url,
		method: "uploadFileObject",
		method: 'post',
		data: data,
		formData: formData,
		...config
	});
};
// 上传文件 批量
const uploadFiles = (url, params = {}, formData = {}) => {
	return uniRequest({
		url: url,
		method: "uploadFiles",
		params: params,
		formData: formData,
	});
};
/**
 * 参数处理
 * @param {*} params  参数
 */
const tansParams = function(params) {
	let result = ''
	Object.keys(params).forEach((key) => {
		if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
			result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
		}
	})
	return result
};

export {
	get,
	getJson,
	post,
	postJson,
	put,
	putJson,
	postFormdata,
	del,
	delJson,
	upload,
	uploadFiles,
	uploadFileObject,
	uploadBlob
};
