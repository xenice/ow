<template>
	<view>
		<m-card v-if="type=='standard' && data.url">
			<m-list :hasMore="true" :url="data.url" :params="data.params" ></m-list>
		</m-card>
		<m-card v-else-if="type=='simple' && data.url">
			<m-list-simple :hasMore="true" :url="data.url" :params="data.params" ></m-list-simple>
		</m-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPage: false,
				type:'standard', // standard, simple
				data:{}
			}
		},
		onLoad(options){
			
			console.log(options);
			this.isPage = true;
			this.base = getApp().globalData.base;
			let params = {};
			if(options.params){
				params = options.params;
				
			}
			if(options.extra){
				this.type = options.extra;
			}

			if(options.extra1){
				uni.setNavigationBarTitle({
				    title: options.extra1
				});
			}
			
			this.data = {
				url:this.base + 'posts',
				params:params
			}
			
			
		},
		mounted(){
			if(this.isPage) return;
			let settings = getApp().globalData.settings;
			this.data = settings.news;
		}
	}
	
</script>

<style>
</style>