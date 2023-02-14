<template>
	<view>
		<template
			v-for="(item, index) in list"
		>
			<u-swiper
					v-if="item.id == 'banner'"
					:radius="0"
					:list="item.list"
			></u-swiper>
			<template v-else-if="item.id == 'message'">
				<u-gap height="8"></u-gap>
				<m-card :title="item.title">
					<u-gap height="5" ></u-gap>
					<view class="m-block">
						<text class="m-block__title">昵称</text>
						<view class="m-block__content">
							<u--input
								v-model="params.name"
							  ></u--input>
						</view>
					</view>
					<view class="m-block">
						<text class="m-block__title">手机</text>
						<view class="m-block__content">
							<u--input
							    v-model="params.phone"
							  ></u--input>
						</view>
					</view>
					<view class="m-block">
						<text class="m-block__title">邮箱</text>
						<view class="m-block__content">
							<u--input
							    v-model="params.email"
							  ></u--input>
						</view>
					</view>
					<view class="m-block">
						<text class="m-block__title">留言</text>
						<view class="m-block__content">
							<u--textarea v-model="params.message"></u--textarea>
						</view>
					</view>
					<u-gap height="10" ></u-gap>
					<view class="m-block">
						<u-button type="primary" text="提交" @click="click"></u-button>
					</view>
				</m-card>
			</template>
			<template v-if="item.id == 'contacts'">
				<u-gap height="8"></u-gap>
				<m-card title="联系方式">
					<m-contacts :list="item.list"></m-contacts>
				</m-card>
			</template>
		</template>
		
		
	</view>
</template>

<script>
import http from '@/utils/http.js';
export default {
	data() {
		return {
			base: '',
			list: {},
			params: {
				name:'',
				phone:'',
				email:'',
				message:''
			}
		};
	},
	mounted(){
		let settings = getApp().globalData.settings;
		this.base = getApp().globalData.base;
		this.list = settings.message;		
	},
	methods: {
		click(){

			if(this.params.name == ''){
				uni.showToast({
					title: '昵称不能为空',
					icon: 'error'
				})
				return;
			}
			if(this.params.phone == ''){
				uni.showToast({
					title: '手机不能为空',
					icon: 'none'
				})
				return;
			}
			if(this.params.email == ''){
				uni.showToast({
					title: '邮箱不能为空',
					icon: 'none'
				})
				return;
			}
			if(this.params.message == ''){
				uni.showToast({
					title: '留言不能为空',
					icon: 'none'
				})
				return;
			}
			
			uni.showLoading({
				title: '提交中...'
			});
			
			
			this.list.forEach((val, index)=>{
				if(val.id == 'message'){
					console.log(index);
					this.params.nonce = this.list[index].nonce;
					return;
				}
			});
			http.post(this.base+'message', this.params).then(res => {
				uni.hideLoading();
				uni.showToast({
					title: '提交成功',
					icon: 'success',
					duration: 3000
				});
				this.params = {
					name:'',
					phone:'',
					email:'',
					message:''
				};
			}).catch(res => {
				uni.hideLoading();
				let msg = '提交失败';
				if(res.data.message){
					msg = res.data.message;
				}
				uni.showToast({
					title: msg,
					icon: 'error',
					duration: 3000
				})
			});
		}
	},

};
</script>

<style lang="scss">
	.m-block {
		flex: 1;
		margin-bottom: 15px;
		
		&__content {
			@include flex(column);
			font-size: 14px;
		}
		
		&__title {
			font-size: 14px;
			color: rgb(143, 156, 162);
			margin-bottom: 8px;
			@include flex;
		}
	}
</style>