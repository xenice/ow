class Http
{	
	static request(url, data = {}, method = "GET") {
		return new Promise(function(resolve, reject) {
			if (!data.notip) {
				uni.showLoading({
					title: '加载中'
				});
			}
			
			uni.request({
				url: url,
				data: data,
				method: method,
				success(res) {
					console.log(url);
					console.log(data);
					console.log(res);
					if (res.statusCode == 200 || res.statusCode == 201) {
						resolve(res);
						return;
					}
					reject(res);
				},
				fail(err) {
					reject(err);
				},
				complete() {
					uni.hideLoading();
				}
			});
		});
	}
	
	/**
	 * get请求
	 */
	static get(url, data = {}) {
		return this.request(url, data, 'GET');
	}
	
	/**
	 * post请求
	 */
	static post(url, data = {}) {
		return this.request(url, data, 'POST');
	}
}

export default Http;