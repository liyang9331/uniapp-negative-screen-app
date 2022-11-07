export default {
	methods:{
		checkLogin(){
			// 检测本地缓存内是否含有token
			// token
			try{
				const user = uni.getStorageSync('user');
				const timestamp = new Date().getTime();//时间戳 毫秒
				if(user.token && user.token_overdue && user.token_overdue>timestamp){
					this.$store.commit('login',user);
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}else{
					// 用户未登录
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}
			}catch(e){
				// 用户未登录
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
			
		},
		storageToken(user){
			const tt = 3600000*24*7;
			const token_overdue = new Date().getTime()+tt;//时间戳 毫秒
			const data = {...user,token_overdue:token_overdue}
			try{
				uni.setStorageSync('user',data);
				return true;
			}catch(e){
				
			}
		}
	}
}