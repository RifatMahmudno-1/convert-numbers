export default function (app) {
	app.config.globalProperties.$cookie = {
		get(name) {
			return document.cookie
				.split(';')
				.find(el => el.search(name) >= 0)
				?.split('=')[1]
		},
		set(aa, bb, days) {
			let expire = ''
			if (days) {
				days = parseFloat(days)
				if (days == NaN) days = 1
				expire = `Expires=${new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000).toUTCString()};`
			}
			document.cookie = `${aa}=${bb || ''}; Path=/; ${expire}`
		},
		del(name) {
			document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
		},
		all() {
			let aa = {}
			document.cookie.split(';').forEach(el => {
				let bb = el.replace(/ /g, '').split('=')
				aa[bb[0]] = bb[1]
			})
			return aa
		}
	}
}
