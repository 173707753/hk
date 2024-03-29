export default [
	{
		path: '/',
		name: '首页',
		redirect: '/home',
	},
	{
		path: '/home',
		name: '首页',
		meta: { isTab: false },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/home/index.vue'),
	},
	{
		path: '/main',
		name: '数据详情',
		meta: { isTab: false },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/main/index.vue'),
	},
	{
		path: '/stark',
		name: '指标',
		meta: { isTab: false },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/stark/index.vue'),
	},
	{
		path: '/evaluate',
		name: '优化指标',
		meta: { isTab: false },
		component: () =>
			import(/* webpackChunkName: "pages" */ '@/pages/evaluate/index.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		meta: { isTab: false },
		component: () =>
			import('@/pages/home/login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		meta: { isTab: false },
		component: () =>
			import('@/pages/home/register.vue'),
	},
]
