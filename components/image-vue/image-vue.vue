<template>
	<image :src="url" :style="styles"></image>
</template>

<script>
	export default {
		name:"image-vue",
		props:{
			url:{
				type:[String],
			},
			styles:{
				type:[Object]
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