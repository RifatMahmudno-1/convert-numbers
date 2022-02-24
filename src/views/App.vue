<template>
	<Error :errText="errText" />
	<Header />
	<main>
		<router-view @errText="errorText" />
	</main>
	<Footer />
</template>
<script>
	export default {
		data() {
			return {
				errText: undefined
			}
		},
		methods: {
			errorText(e) {
				this.errText = undefined
				setTimeout(() => {
					this.errText = e
				}, 5)
			}
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		font-size: 20px;
		font-family: 'Signika';
	}
	#app {
		display: grid;
		width: 100%;
		height: 100%;
		min-height: 100vh;
		grid-template-rows: auto 1fr auto;
	}
	main {
		position: relative;
		background: linear-gradient(135deg, rgb(85, 0, 50), rgb(2, 1, 51));
	}
	input,
	button,
	select,
	textarea {
		font-size: inherit;
		font-family: inherit;
		border: none;
		outline: none;
	}
	@media screen and (max-width: 600px) {
		body {
			font-size: 18px;
		}
	}
	@media screen and (max-width: 450px) {
		body {
			font-size: 16px;
		}
	}
	@media screen and (max-width: 350px) {
		body {
			font-size: 14px;
		}
	}
</style>
