<template>
	<view>
		<m-card v-if="data.id">
			<view class="title">{{data.title.rendered}}</view>
			<view class="date">{{data.post_date}}</view>
			<u-parse :content="data.content.rendered"></u-parse>
			<u-divider text="已到最底啦"></u-divider>
		</m-card>
	</view>
</template>

<script>
	import http from '@/utils/http.js';
	
	export default {
		
		data() {
			return {
				base: '',
				data:{}
			}
		},
		onLoad(options){
			this.base = getApp().globalData.base;
			if(options.id){
				http.get(this.base+'pages/' + options.id, {}).then(res => {
					this.data = res.data;
					uni.setNavigationBarTitle({
					    title: this.data.title.rendered
					});
				});
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	
.title{
	color:#333;
	font-size:15px;
	font-weight: 600;
}

.date{
	font-size:13px;
	color:#999;
	margin-bottom:15px
}

</style>