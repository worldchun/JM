<template>
	<view class="content">
			<text class="title">{{title}}</text>
	</view>
</template>

<script>
	import api from '@/utils/request.js'
	export default {
		data() {
			return {
				title: '哈喽 加盟'
			}
		},
		onLoad() {
			api.request({
				url:'/test'
			}).then(data => {
				console.log(data);
			})
			this.getData()
		},
		methods: {
			async getData() {
				let data = await api.request({
					url:'/test2/test'
				})
				console.log(data);
			}
		}
	}
</script>

<style>

</style>
