<template>
	<div v-if="errText">{{ errText }}</div>
</template>
<script>
	export default {
		props: ['errText']
	}
</script>
<style scoped>
	div {
		position: fixed;
		z-index: 9999;
		background: rgba(255, 0, 0, 0.4);
		border: 2px solid red;
		margin: 0 auto;
		left: 50%;
		transform: translate(-50%, -120%);
		color: #fff;
		font-size: 110%;
		padding: 0.2rem 0.5rem;
		border-radius: 0.4rem;
		box-shadow: 0 2px 5px rgba(255, 0, 0, 0.6);
		animation: slideDown 4s;
	}
	@keyframes slideDown {
		0% {
			transform: translate(-50%, -120%);
		}
		20% {
			transform: translate(-50%, 120%);
		}
		80% {
			transform: translate(-50%, 120%);
		}
		100% {
			transform: translate(-50%, -120%);
		}
	}
</style>
