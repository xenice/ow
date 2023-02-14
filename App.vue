<script>
	export default {
		globalData: {

			// multisite
			multisite: false,
			site: '',
			// end multisite
			
			server: 'https://app.minisi.cn/',
			slug: 'wp-json/ow/v1/',
			base: '',
			settings:{}
		},
		onLaunch: function(options) {
			console.log('App Launch')
			
			// multisite
			if(this.globalData.multisite){
				if(options.query && options.query.site){
					this.globalData.site = options.query.site;
				}
				this.globalData.base = this.globalData.server + this.globalData.site + '/' + this.globalData.slug;
				return;
			}
			// end multisite

			this.globalData.base = this.globalData.server + this.globalData.slug;
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
