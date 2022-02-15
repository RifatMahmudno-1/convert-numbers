<template>
	<div>
		<label>
			From:
			<select v-model="from">
				<option value="binary">Binary</option>
				<option value="octal">Octal</option>
				<option value="decimal">Decimal</option>
				<option value="hex">Hexadecimal</option>
			</select>
		</label>
		<br />
		<label>
			To:
			<select v-model="to">
				<option value="binary">Binary</option>
				<option value="octal">Octal</option>
				<option value="decimal">Decimal</option>
				<option value="hex">Hexadecimal</option>
			</select>
		</label>
		<br />
		<label>
			Number:
			<input type="text" v-model="number" />
		</label>
		<button @click="convertNum">Convert</button>
		<div>Result: {{ !result ? 'Result will be shown here' : result }}</div>
	</div>
</template>
<script>
	import convert from '@/components/convert.js'
	export default {
		data() {
			return {
				result: undefined,
				from: 'decimal',
				to: 'binary',
				number: undefined
			}
		},
		methods: {
			convertNum() {
				this.result = undefined
				if (!this.number) {
					alert('Provide a number')
					return false
				}
				let result = convert({ to: this.to, from: this.from, num: this.number })
				this.number = undefined
				if (result.error) return alert('Invalid Input')
				this.result = result.toUpperCase()
			}
		},
		mounted() {}
	}
</script>
