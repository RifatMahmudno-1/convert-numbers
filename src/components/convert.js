const functions = {
	error() {
		return { error: true }
	},
	removeZero(num) {
		if (num.startsWith('.')) {
			if (num.slice(-1)[0] == '0') num = num.slice(0, num.length - 1)
			if (num.slice(-1)[0] == '0') return this.removeZero(num)
			return num
		} else {
			if (num.startsWith('0')) num = num.slice(1, num.length)
			if (num.startsWith('0')) return this.removeZero(num)
			return num
		}
	},
	method1(num, bit) {
		let allowed = bit == 3 ? ['000', '001', '010', '011', '100', '101', '110', '111'] : bit == 4 ? ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'] : undefined
		if (!allowed) return this.error()
		let int,
			decimal,
			resInt = '',
			resDecimal = '.'
		num.split('.').forEach((el, ind) => {
			if (ind === 0 && this.removeZero(el) != '') int = el
			if (ind === 1 && this.removeZero('.' + el) != '.') decimal = el
		})
		if (int) {
			int.split('').forEach(el => (resInt += allowed[isNaN(el) ? el.charCodeAt(0) - 87 : el]))
			resInt = this.removeZero(resInt)
		}
		if (decimal) {
			decimal.split('').forEach(el => (resDecimal += allowed[isNaN(el) ? el.charCodeAt(0) - 87 : el]))
			resDecimal = this.removeZero(resDecimal)
		}
		return [int ? resInt : '0', decimal ? resDecimal : ''].join('')
	},
	method2(num, devMulti) {
		let int,
			decimal,
			resInt = '',
			resDecimal = '.'
		num.split('.').forEach((el, ind) => {
			if (ind === 0 && this.removeZero(el) != '') int = el
			if (ind === 1 && this.removeZero('.' + el) != '.') decimal = el
		})
		if (int) convInt(parseInt(int))
		if (decimal) convDeci(parseFloat('0.' + decimal))
		function convInt(num) {
			let devide = num / devMulti
			let newNum = Math.trunc(devide)
			let spl = devide.toString().split('.')[1]
			if (spl) {
				if (parseFloat('0.' + spl) * devMulti > 9) resInt = String.fromCharCode(parseFloat('0.' + spl) * devMulti + 96 - 9) + resInt
				else resInt = parseFloat('0.' + spl) * devMulti + resInt
			} else resInt = 0 + resInt
			if (newNum) convInt(newNum)
		}
		function convDeci(num) {
			let multi = num * devMulti
			let spl = multi.toString().split('.')
			if (parseInt(spl[0]) > 9) resDecimal += String.fromCharCode(parseInt(spl[0]) + 96 - 9)
			else resDecimal += spl[0]
			if (resDecimal.length < 20) {
				if (spl[1]) convDeci(parseFloat('0.' + spl[1]))
			}
		}
		return [int ? resInt : '0', decimal ? resDecimal : ''].join('')
	},
	method3(num, bit) {
		let replaceWith = bit == 3 ? ['000', '001', '010', '011', '100', '101', '110', '111'] : bit == 4 ? ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'] : undefined
		if (!replaceWith) return this.error()
		let int,
			decimal,
			resInt = '',
			resDecimal = '.'
		num.split('.').forEach((el, ind) => {
			if (ind === 0 && this.removeZero(el) != '') int = el
			if (ind === 1 && this.removeZero('.' + el) != '.') decimal = el
		})
		if (int) mainCalc(int)
		if (decimal) mainCalc('.' + decimal)
		function mainCalc(argNum) {
			let isDecimal = false
			if (argNum.startsWith('.')) {
				argNum = argNum.replace(/./, '')
				isDecimal = true
			}
			let times = Math.ceil(argNum.length / bit)
			if (argNum.length / bit != times) {
				let loopTimes = times * bit - argNum.length
				for (var i = 0; i < loopTimes; i++) {
					if (!isDecimal) argNum = '0' + argNum
					else argNum += '0'
				}
			}
			for (var i = 0; i < times; i++) {
				if (!isDecimal) {
					let ind = replaceWith.findIndex(el => el == argNum.slice(i * bit, i * bit + bit))
					if (ind > 9) ind = String.fromCharCode(87 + ind)
					resInt += ind
				} else {
					let ind = replaceWith.findIndex(el => el == argNum.slice(i * bit, i * bit + bit))
					if (ind > 9) ind = String.fromCharCode(87 + ind)
					resDecimal += ind
				}
			}
		}
		return [int ? this.removeZero(resInt) : '0', decimal ? this.removeZero(resDecimal) : ''].join('')
	},
	method4(num, to) {
		if (to == 'hex') return this.method3(this.method1(num, 3), 4)
		if (to == 'octal') return this.method3(this.method1(num, 4), 3)
		return this.error()
	},
	method5(num, base) {
		let int,
			decimal,
			resInt = '',
			resDecimal = '.'
		num.split('.').forEach((el, ind) => {
			if (ind === 0 && this.removeZero(el) != '') int = el
			if (ind === 1 && this.removeZero('.' + el) != '.') decimal = el
		})
		if (int) mainFunc(int)
		if (decimal) mainFunc('.' + decimal)
		function mainFunc(argNum) {
			let isDecimal = false
			if (argNum.startsWith('.')) {
				argNum = argNum.replace(/./, '')
				isDecimal = true
			}
			if (!isDecimal)
				resInt += argNum
					.split('')
					.map((el, ind) => (el = (isNaN(el) ? el.charCodeAt(0) - 87 : parseInt(el)) * Math.pow(base, argNum.length - ind - 1)))
					.reduce((a, b) => a + b, 0)
			if (isDecimal) {
				let aa = argNum
					.split('')
					.map((el, ind) => (el = (isNaN(el) ? el.charCodeAt(0) - 87 : parseInt(el)) * Math.pow(1 / base, ind + 1)))
					.reduce((a, b) => a + b, 0)
					.toString()
				aa.split('.').forEach((el, ind) => {
					if (ind == 0 && el != '' && parseInt(el) > 0) {
						if (parseInt(resInt) > 0) resInt = (parseInt(resInt) + parseInt(el)).toString()
						else resInt += el
						if (!int) int = true
					}
					if (ind == 1 && el != '' && parseInt(el) > 0) {
						resDecimal += el
					}
				})
			}
		}
		return [int ? resInt : '0', decimal ? resDecimal : ''].join('')
	},
	fromDecimal(to, num) {
		if (num.match(/[^.0-9]+/, '') != null) return this.error()
		if (to == 'decimal') return num
		if (to == 'octal') return this.method2(num, 8)
		if (to == 'hex') return this.method2(num, 16)
		if (to == 'binary') return this.method2(num, 2)
		return this.error()
	},
	fromBinary(to, num) {
		if (num.match(/[^.0-1]+/, '') != null) return this.error()
		if (to == 'decimal') return this.method5(num, 2)
		if (to == 'octal') return this.method3(num, 3)
		if (to == 'hex') return this.method3(num, 4)
		if (to == 'binary') return num
		return this.error()
	},
	fromHex(to, num) {
		if (num.match(/[^.0-9a-f]+/i, '') != null) return this.error()
		if (to == 'decimal') return this.method5(num, 16)
		if (to == 'octal') return this.method4(num, to)
		if (to == 'hex') return num
		if (to == 'binary') return this.method1(num, 4)
		return this.error()
	},
	fromOctal(to, num) {
		if (num.match(/[^.0-7]+/, '') != null) return this.error()
		if (to == 'decimal') return this.method5(num, 8)
		if (to == 'octal') return num
		if (to == 'hex') return this.method4(num, to)
		if (to == 'binary') return this.method1(num, 3)
		return this.error()
	}
}

function convert(args) {
	if (!args || !args.from || !args.to || !args.num) return functions.error()
	args.num = args.num.toLowerCase()
	if (args.from == 'decimal') return functions.fromDecimal(args.to, args.num)
	if (args.from == 'binary') return functions.fromBinary(args.to, args.num)
	if (args.from == 'hex') return functions.fromHex(args.to, args.num)
	if (args.from == 'octal') return functions.fromOctal(args.to, args.num)
	return functions.error()
}

export default convert

// console.log(
// 	convert({
// 		from: 'octal',
// 		to: 'decimal',
// 		num: '17.156'
// 	})
// )

//<-----------EnD------------>

//method1 will convert hex to binary, octal to binary || done 2
//method2 will convert decimal to binary, decimal to octal, decimal to hex || done 3
//method3 will convert binary to hex, binary to octal || done 2
//method4 will convert hex to octal, octal to hex || done 2 (a combination of method1 and method 3)
//method5 will convert octal to decimal, hex to decimal, binary to decimal || done 3
//total 12
