<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'App',
	components: {},
}
</script>

<style lang="scss">
#app {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
}
</style>
