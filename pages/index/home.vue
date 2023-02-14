<template>
	<view>
		<template
			v-for="(item, index) in list"
		>
			<u-swiper 
				v-if="item.id == 'slide'"
				:radius="0"
				:list="item.list"
				keyName="src"
				showTitle
				@click="swiperClick"
			></u-swiper>
			<m-card v-if="item.id == 'nav'">
				<u-scroll-list :indicator="item.indicator">
					<view class="scroll-list">
						<view
							class="scroll-list__line"
							v-for="(item0, index0) in item.list"
							:key="index0"
						>
							<view
								class="scroll-list__line__item"
								v-for="(item1, index1) in item0"
								:key="index1"
								:class="[(index1 === item0.length - 1) && 'scroll-list__line__item--no-margin-right']"
								@click="navClick(item1.url)"
							>
								<image
									class="scroll-list__line__item__image"
									:src="item1.src"
									mode=""
								></image>
								<text class="scroll-list__line__item__text">{{ item1.title }}</text>
							</view>
						</view>
					</view>
				</u-scroll-list>
			</m-card>
			
			<template v-if="item.id == 'about'">
				<u-gap height="8" bgColor="#fafafa"></u-gap>
				<m-card 
					:title="item.title"
					:content="item.content"
				>
				</m-card>
			</template>
			<template v-if="item.id == 'products'">
				<u-gap height="8" bgColor="#fafafa"></u-gap>
				<m-card 
					title="产品服务" 
					text="查看更多" 
					url="/pages/index/list" 
					:params="item.more_params"
					extra='simple'
					extra1='产品服务'
				>
					<m-products :url="item.url" :params="item.params"></m-products>
				</m-card>
			</template>
			<template v-if="item.id == 'news'">
				<u-gap height="8" bgColor="#fafafa"></u-gap>
				<m-card 
					title="最新动态" 
					text="查看更多" 
					url="/pages/index/list" 
					:params="item.more_params"
					extra1='最新动态'
				>
					<m-list :url="item.url" :params="item.params"></m-list>
				</m-card>
			</template>
			<template v-if="item.id == 'contacts'">
				<u-gap height="8" bgColor="#fafafa"></u-gap>
				<m-card title="联系方式">
					<m-contacts :list="item.list"></m-contacts>
				</m-card>
			</template>
		</template>
		<m-footer :data="footer"></m-footer>
	</view>
</template>

<script>
	import http from '@/utils/http.js';
	export default {
		data() {
			return {
				list:{},
				footer:{}
			}
		},
		mounted() {
			let settings = getApp().globalData.settings;
			this.base = getApp().globalData.base;
			this.list = settings.home;
			this.footer = settings.footer;
		},
		methods: {
			swiperClick(index) {
				let url = this.swiperList[index].url
				if(url){
					uni.navigateTo({
						url:url
					})
				}
				
			},
			navClick(url) {
				if(url){
					uni.navigateTo({
						url:url
					})
				}
				
			},
			
		}
	}
</script>

<style lang="scss">
.scroll-list {
	@include flex(column);

	&__line {
		@include flex;
		margin-top: 10px;

		&__item {
			margin-right: 15px;
			text-align: center;
			&__image {
				width: 56px;
				height: 56px;
				padding:3px;
			}

			&__text {
				margin-top: 5px;
				color: $u-content-color;
				font-size: 12px;
				text-align: center;
				display:block;
			}
			&__text span{
				text-align: center;
			}
			&--no-margin-right {
				margin-right: 0;
			}
		}
	}
}



</style>