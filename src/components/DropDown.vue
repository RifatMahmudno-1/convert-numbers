<template>
	<div ref="dropDown" class="drop_down">
		<div @click="showNav">
			<span>{{ arr[selected] }}</span>
			<img draggable="false" :src="`/${display == 'none' ? 'down' : 'up'}.png`" />
		</div>
		<nav :style="`display:${display}`">
			<div v-for="(ele, ind) in arr" :class="selected == ind ? 'active' : ''" :key="ind" @click="selectChange(ind)">{{ ele }}</div>
		</nav>
	</div>
</template>
<script>
	export default {
		props: ['arr', 'default'],
		data() {
			return {
				selected: this.default,
				display: 'none'
			}
		},
		methods: {
			selectChange(ind) {
				if (this.selected === ind) return false
				this.selected = ind
				this.$emit('selectChange', ind)
			},
			showNav() {
				if (this.display == 'block') return false
				this.display = 'block'
				setTimeout(() => {
					window.addEventListener('click', this.clickEv)
				}, 5)
			},
			clickEv(e) {
				let path = e.path ? e.path : e.composedPath()
				if (path.includes(this.$refs.dropDown)) return false
				window.removeEventListener('click', this.clickEv)
				this.display = 'none'
			}
		}
	}
</script>
<style scoped>
	.drop_down {
		position: relative;
		margin-left: 0.5rem;
		text-align: center;
		width: max-content;
		cursor: pointer;
	}
	.drop_down > div {
		background: linear-gradient(135deg, rgb(85, 0, 50), rgb(2, 1, 51));
		width: 100%;
		border-radius: 0.2rem;
		border: 1px solid rgb(139, 0, 81);
		padding: 0.1rem 0.3rem;
	}
	.drop_down > nav {
		position: absolute;
		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
		color: rgb(0, 81, 255);
		z-index: 99;
		padding: 0.2rem;
		border-radius: 0.3rem;
		overflow: hidden;
		margin-top: 0.2rem;
	}
	.drop_down > nav > div.active {
		background: aqua;
	}
	.drop_down > nav > div:hover {
		background: rgba(208, 255, 0, 0.712);
	}
	.drop_down > div > img {
		height: 0.9em;
		vertical-align: middle;
	}
	.drop_down > div > span {
		padding: 0 1rem;
	}
	@media screen and (max-width: 350px) {
		.drop_down > div > span {
			padding: 0 0.5rem;
		}
	}
</style>
