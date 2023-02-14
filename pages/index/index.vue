<template>
	<view v-if="list.length>0">
		<template v-for="(item, index) in list">
			<home v-if="item.id=='home' && tab==index"></home>
			<list v-else-if="item.id=='news' && tab==index"></list>
			<msg v-else-if="item.id=='message' && tab==index"></msg>
		</template>
		<u-tabbar
		    :value="tab"
		    @change="change"
		    :fixed="true"
			:placeholder="true"
		    :safeAreaInsetBottom="true"
		>
			<u-tabbar-item
			    :text="item.text"
			    :icon="item.icon"
				v-for="(item, index) in list"
				:key="index"
			>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import http from '@/utils/http.js';
	import home from './home.vue';
	import list from './list.vue';
	import msg from './msg.vue';
	
	
	export default {
		components:{
			home,list,msg
		},
		
		data() {
			return {
				tab: 0,
				list: [],
			}
		},
		onLoad(){
			console.log(getApp().globalData);
			this.base = getApp().globalData.base;
			let settings = getApp().globalData.settings;
			this.list = settings.tabbar.list;
			this.tab = settings.tabbar.index;

		},
		methods: {
			change(index) {
				this.tab = index;
				uni.setNavigationBarTitle({
				    title: this.list[index].text
				});
			}
		}
	}
</script>

<style lang="scss">

</style>

