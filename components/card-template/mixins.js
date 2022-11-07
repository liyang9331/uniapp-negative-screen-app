import * as nativeApi from "@/utils/nativeAPI.js"
import * as request from '@/utils/request.js';
import config from "@/config.js"
import storage from "@/utils/storage.js"
import {cardClickCollection} from "@/api/dataAcquisition.js"
export default {
	props: {
		cardData: {
			type: [Object]
		},
		isRun: {
			type: [Boolean],
			default: false
		},
		// 是否补齐域名或ip地址
		isBaseUrl: {
			type: [Boolean],
			default: true
		}
	},
	data() {
		return {
			card: {}, //卡片数据
			config: {}, //配置文件
			storage: {},
			eventName: "", //全局事件名称
		}
	},
	created() {
		this.storage = storage;
		this.config = config;
		// 深拷贝
		this.card = JSON.parse(JSON.stringify(this.cardData));
		// 生成事件名称
		this.eventName = "watchUpdataStext" + this.card.cardId;
		if (this.isRun) {
			uni.$store.commit("setCardTmpGlobalEvent",this.eventName)
			uni.$on(this.eventName, res => {
				console.log("监听到app onShow,更新数据")
				this.request()
			})
		}
		this.card.cardLogoPic =this.card.cardLogoPic!=""?this.insertDomainName("cardLogoPic"):"";
		this.card.cardBgPic = this.card.cardBgPic!=""?this.insertDomainName("cardBgPic"):"";
		this.card.cardPic =this.card.cardPic!=""?this.insertDomainName("cardPic"):"";
		this.card.cardThumbPic =this.card.cardThumbPic!=""?this.insertDomainName("cardThumbPic"):"";
		this.request();
		// console.log(this.card)
	},
	beforeDestroy() {
		if (this.isRun) {
			uni.$off(this.eventName)
			uni.$off("watchUpdataStext");
		}
	},
	methods: {
		// 卡片整体点击事件
		cardClickHandle() {
			if (this.isRun) {
				// 组装参数
				this.launchApplication(this.card.application.appPackage || "", this.card.cardInterface);
				const mobile = storage.get("phoneNum");
				if(mobile==null){
					
				}else{
					// 上传点击行为数据
					const params = {cardId:this.card.cardId,appId:this.card.appId,mobile:mobile}
					this.uploadClickCollection(params).then(res=>{
						console.log("行为数据上传成功")
					}).catch(err=>{
						console.log("行为数据上传失败，尝试重新上传")
						// 上传失败
						this.uploadClickCollection(params);
					})
				}
			}

		},
		// 上传点击行为数据
		uploadClickCollection(params){
			return new Promise((resolve,reject)=>{
				cardClickCollection(params).then(res=>{
					// console.log(res)
					resolve();
				}).catch(err=>{
					// console.log(err)
					reject()
				})
			})
		},
		// 点击事件
		iconHandle(event, params) {
			if (this.isRun) {
				// console.log(params)
				// 阻止继续冒泡.
				event.stopPropagation();
				this.launchApplication(this.card.application.appPackage || "", params.interface)
			}

		},
		// 请求接口
		api(url, params) {
			// isThirdParty 代表第三方请求
			return request.get(url, {
				...params,
				isThirdParty: true
			});
		},
		// 打开第三方APP
		launchApplication(packageName = "", url = "") {
			// 先执行openURL
			// console.log(packageName,url)
			nativeApi.openURL(url, (err) => {
				// 打开失败
				nativeApi.launchApplication(packageName, {}, (res) => {})
			})
		},
		// 补齐域名或者ip
		insertDomainName(name) {
			if (this.isBaseUrl) {
				return this.config.baseURL + this.cardData["" + name];
			} else {
				return this.card["" + name]
			}
		}
	},
}
