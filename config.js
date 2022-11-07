// 开发环境接口根路径
const devBaseURL = "http://8.142.150.108:8800";
// 生产环境接口根路径
const proBaseURL = "";
// 对外暴露的接口根路径
const baseURL = devBaseURL;
// app 包名
const pname = "com.huawei.android.nsia"
// 签名字符串
const autograph = "hnxzd0y5vkfJ"
const config = {
	devBaseURL,
	proBaseURL,
	baseURL,
	pname,
	autograph,
}

export default config;
