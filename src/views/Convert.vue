<template>
	<section>
		<div class="box">
			<div class="ele_box">
				<div class="conv_from">
					Convert From:
					<DropDown :arr="arr" :default="2" @selectChange="e => selectChange('from', e)" />
				</div>
				<div>Enter your number:</div>
				<textarea @keypress="keypressConvert" v-model="number" placeholder="Type the number that you want to convert"></textarea>
				<div class="conv_to">
					Convert To:
					<DropDown :arr="arr" :default="0" @selectChange="e => selectChange('to', e)" />
				</div>
			</div>
			<button @click="convertNum">Convert Number</button>
			<div class="ele_box">
				<div>Result:</div>
				<textarea v-model="result" disabled></textarea>
			</div>
		</div>
	</section>
</template>
<script>
	import convert from '@/components/convert.js'
	export default {
		data() {
			return {
				arr: ['Binary', 'Octal', 'Decimal', 'Hexadecimal'],
				convFrom: 'decimal',
				convTo: 'binary',
				number: undefined,
				result: undefined
			}
		},
		methods: {
			selectChange(type, val) {
				if (type == 'from') this.convFrom = val == 3 ? 'hex' : this.arr[val].toLowerCase()
				if (type == 'to') this.convTo = val == 3 ? 'hex' : this.arr[val].toLowerCase()
			},
			convertNum(e) {
				this.result = undefined
				if (!this.number || this.number == '') return this.$emit('errText', 'No number provided')
				let result = convert({ from: this.convFrom, to: this.convTo, num: this.number })
				if (result.error) {
					this.$emit('errText', 'Invalid Number')
					this.result = `Invalid Number. Please provide a valid ${this.convFrom == 'hex' ? 'Hexadecimal' : this.convFrom.slice(0, 1).toUpperCase() + this.convFrom.slice(1, this.convFrom.length)} number.`
				} else this.result = result
			},
			keypressConvert(e) {
				if (e.keyCode == 13) {
					e.preventDefault()
					this.convertNum()
				}
			}
		}
	}
</script>
<style scoped>
	section {
		display: grid;
		width: 100%;
		height: 100%;
		justify-items: center;
		align-items: center;
		padding: 1rem;
		color: #fff;
	}
	.box {
		backdrop-filter: blur(5px);
		background: rgba(255, 255, 255, 0.2);
		width: 100%;
		max-width: 800px;
		border-radius: 0.5rem;
		padding: 0.2rem 0.5rem;
		box-shadow: 0 5px 10px rgb(75, 75, 75);
	}
	textarea {
		resize: vertical;
		width: 100%;
		height: 3em;
		border-radius: 0.2rem;
		padding: 0.2rem;
		font-size: 110%;
	}
	.ele_box {
		margin: 0.4rem 0.2rem;
		padding: 0.2rem 0.4rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 0.5rem;
	}
	.ele_box > *:not(:last-child) {
		margin-bottom: 0.2rem;
	}
	.conv_from,
	.conv_to {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
	}
	button {
		display: block;
		width: fit-content;
		margin: 0.5rem auto;
		padding: 0.2rem 0.5rem;
		font-size: 110%;
		color: #fff;
		background: linear-gradient(135deg, rgb(85, 0, 50), rgb(2, 1, 51));
		border: 2px solid aqua;
		border-radius: 0.5rem;
		box-shadow: 0 2px 5px aqua;
		transition: box-shadow 0.3s;
	}
	button:hover {
		box-shadow: 0 5px 10px aqua;
	}
	textarea[disabled] {
		background: #fff;
		color: #000;
	}
</style>
