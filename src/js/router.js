import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:pathMatch(.*)*',
			meta: {
				title: 'Convert Numbers',
				description: 'Convert Numbers'
			},
			component: () => import('@/views/Convert.vue')
		}
	]
})
router.beforeEach((to, from, next) => {
	document.title = to.meta.title || 'Numbers'
	next()
})
export default router
