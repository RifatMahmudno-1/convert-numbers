export default function (app) {
	app.config.globalProperties.$storage = {
		local: {
			set(name, value) {
				window.localStorage.setItem(name, JSON.stringify(value))
			},
			get(name) {
				return JSON.parse(window.localStorage.getItem(name))
			}
		},
		session: {
			set(name, value) {
				window.sessionStorage.setItem(name, JSON.stringify(value))
			},
			get(name) {
				return JSON.parse(window.sessionStorage.getItem(name))
			}
		}
	}
}
