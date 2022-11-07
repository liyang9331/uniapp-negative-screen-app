function heartCheck() {
	return {
		timeout: 15000,
		timeoutObj: null,
		reset: function() {
			clearInterval(this.timeoutObj)
			this.start()
		},
		start: function() {
			this.timeoutObj = setInterval(function() {
				// Websocket发送心跳：HeartBeat
				uni.sendSocketMessage({
					// data: "HeartBeat",
					success: res => {

					},
					fail: () => {

					},
					complete: () => {

					}
				})
			}, this.timeout)
		},
	}
}

export default function webSocket(handlerOptions) {
	let {
		onmessage,
		onopen,
		socketUrl
	} = handlerOptions
	let heart = heartCheck()
	// 创建 webSocket 连接
	uni.connectSocket({
		url: socketUrl,
		method: 'POST',
		header: {
				'content-type': '	application/json;charset=UTF-8'
		},
		success: res => {

		},
		fail: () => {

		},
		complete: () => {

		}
	})
	//连接成功建立的回调方法
	uni.onSocketOpen(function(res) {
		uni.log('WebSocket连接已打开！');
		heart.start()
		onopen && onopen()
	});
	uni.onSocketError(function(res) {
		uni.log('WebSocket连接打开失败，请检查！');
	});
	//接收到消息的回调方法
	uni.onSocketMessage(res => {
		let message = res.data //消息内容
		heart.reset() //重置心跳上传时间
		onmessage && onmessage(message) //消息业务处理
	})
}
