<template>
	<p>{{ greeting }} World</p>
</template>

<script>
	// This is a single file components
	module.exports = {
		data: function() {
			return {
				greeting: 'Hello'
			}
		}
	}
</script>

<style scoped>

p { 
	font-size: 2em;
	text-align: center;
}

</style>