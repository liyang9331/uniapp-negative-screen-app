<template>
	<view class="">
		<u--image :src="src"></u--image>
		<view class="">
			<text>{{title}}</text>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"card-introduce",
		props:{
			src:{
				typeof:[String],
				default:"/static/image/card.png"
			},
			title:{
				typeof:[String],
				default:"娱乐"
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>