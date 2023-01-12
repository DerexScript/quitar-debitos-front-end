import Home from '../pages/Home/view'
import IRoutes from './IRoutes'

const HomeRoute: IRoutes[] = [
	{
		path: '/home',
		component: Home,
		protected: true,
		displayName: 'Home'
	},
	{
		path: '/',
		component: Home,
		protected: true,
		displayName: 'Home'
	}
]

export default HomeRoute
