export default [
	{
		path: '/',
		name: '数据详情',
		redirect: '/main',
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
]
