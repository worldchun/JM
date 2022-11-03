export default {
	config:{
		baseURL:'112',
		// 处理token 超时退出登录
		getToken() {
			let token = uni.getStorageSync('token')
			if(!token) {
				return uni.reLaunch({
					url:'/pages/login/login'
				})
			}
			return token
		},
		// 请求拦截器
		beforeRequest(options={}){
			return new Promise((resolve,reject) => {
				options.url = this.baseURL + options.url
				options.method = options.method || 'GET'
				// 封装请求头
				options.header = {
					token: this.getToken(),
					// authorization: `Bearer ${this.getToken()}`
				}
				resolve(options)
			})
		},
		// 响应拦截器
		handleResponse(data) {
			return new Promise((resolve,reject) => {
				const [err,res] = data
				// 处理错误
				if(res && res.statusCode !==200) {
					let msg = res.data.msg || '请求错误'
					uni.showToast({
						icon:'none',
						title:'请求错误'
					})
					return reject(msg)
				}
				if(err) {
					uni.showToast({
						icon:'none',
						title:'请求错误'
					})
					return reject(err)
				}
				return resolve(res.data)
			})
		}
	},
	request(options={}){
		return this.config.beforeRequest(options).then(opt =>{
			console.log(opt);
			return uni.request(opt)
		}).then(res => this.config.handleResponse(res))
	}
}
