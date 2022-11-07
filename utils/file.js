/**
 * FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
 * Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。
 * Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
 * ArrayBuffer 对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray 视图和 DataView 视图)来读写，视图的作用是以指定格式解读二进制数据。
 * Uint8Array 对象是 ArrayBuffer 的一个数据类型（8 位不带符号整数）。
 * TextEncoder 接受代码点流作为输入，并提供 UTF-8 字节流作为输出。
 * TextDecoder 接口表示一个文本解码器，一个解码器只支持一种特定文本编码，例如 utf-8、iso-8859-2、koi8、cp1261，gbk 等等。解码器将字节流作为输入，并提供代码点流作为输出。
 * window.atob(encodedStr) 该方法返回一个解码的字符串。
 * charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
 */

/**
 * base64 转 blob
 * @param {base64} base64
 * @return {Blob}
 */
export function base64ToBlob(base64) {
	let type = base64.split(",")[0].match(/:(.*?);/)[1]; //提取base64头的type如 'image/png'     
	let bytes = window.atob(base64.split(',')[1]); //去掉url的头，并转换为byte (atob:编码 btoa:解码)
	// let ab = new ArrayBuffer(bytes.length); //通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
	const arrayBuffer = new ArrayBuffer(bytes.length); //创建缓冲数组
	const intArray = new Uint8Array(arrayBuffer); //创建视图
	for (let i = 0; i < bytes.length; i++) {
		intArray[i] = bytes.charCodeAt(i); //返回指定位置的字符的 Unicode 编码
	}
	let blob = new Blob([intArray], {
		type: type
	});
	return blob
}

/**
 * blob 转 dataUrl
 * @param {Blob} blob 
 * @param {Object} callback 回调函数
 * @return {DataURL}
 */
export function blobToDataURI(blob, callback) {
	var reader = new FileReader();
	reader.onload = function(e) {
		callback(e.target.result);
	}
	reader.readAsDataURL(blob);
}

/**
 * base64 转 文件
 * @param {base64} base64 
 * @param {String} fileName
 * @return {File}
 */
export function base64ToFile(base64, fileName) {
	let type = base64.split(",")[0].match(/:(.*?);/)[1]; //提取base64头的type如 'image/png'     
	let bytes = atob(base64.split(',')[1]); //去掉url的头，并转换为byte (atob:编码 btoa:解码)
	let ab = new Uint8Array(bytes.length); //通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象 8 位不带符号整数
	for (let i = 0; i < bytes.length; i++) {
		ab[i] = bytes.charCodeAt(i); //返回指定位置的字符的 Unicode 编码
	}
	/**
	 * 我们接触的多数关于 File 的操作都是读取，js也为我们提供了手动创建 File 对象的构造函数
	 * File(bits, name[, options])
	 * 参数一bits (必须)：参数的类型必须是ArrayBuffer，ArrayBufferView，Blob，或者 Array[string] 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。
	 * 参数二name（必须）：参数的类型为字符串String，表示文件名称，或者文件路径
	 * 参数三options（可选）：参数的类型为对象。表示选项对象，包含文件的可选属性：type 和 lastModified。可用的选项如下：
	 * （1）type------ string, 表示将要放到文件中的内容的MIME类型。默认值为 空字符串
	 * （2）lastModified ------ 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。
	 */
	const options = {
		type: type,
		endings: 'native'
	}
	const file = new File([ab], fileName + '.' + type.split('/')[1], options)
	return file
}

/**
 * 文件下载
 * @param {ArrayBuff} res 二进制文件 
 * @param {String} fileName 文件名
 * @param {String} type 类型
 */
export function downloadFile(res, fileName,type="image/jpeg") {
	const blob = new Blob([res], {
		type: type
	}) // res为从后台返回的数据
	const url = window.URL.createObjectURL(blob) // res为从后台返回的数据
	if (!fileName) {
		fileName = decodeURI(res.headers['content-disposition']).split('filename=')[1]
	}
	if ('msSaveOrOpenBlob' in navigator) {
		window.navigator.msSaveOrOpenBlob(blob, fileName)
	} else {
		const elink = document.createElement('a')
		elink.setAttribute('download', fileName)
		elink.style.display = 'none'
		elink.href = url
		document.body.appendChild(elink)
		elink.click()
		URL.revokeObjectURL(elink.href)
		document.body.removeChild(elink)
	}
}

/**
 * blob 转 二进制缓冲区
 * @param {Blob} blob 
 * @return {arrayBuffer}
 */
export function blobToArrayBuffer(blob) {
	var reader = new FileReader()
	reader.readAsArrayBuffer(blob)
	reader.onload = function() {
		const arrayBuffer = this.result
		return arrayBuffer
	}
}
