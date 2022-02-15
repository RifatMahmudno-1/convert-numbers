import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			meta: {
				title: 'Home',
				description: 'Home page of this Site'
			},
			component: () => import('@/views/Home.vue')
		}
	]
})
router.beforeEach((to, from, next) => {
	document.title = to.meta.title || 'websiteName'
	next()
})
export default router
