import ChargeCreate from 'pages/Charge/create'
import ChargeList from 'pages/Charge/list'
import ChargeView from 'pages/Charge/view'

import IRoutes from './IRoutes'

const HomeRoute: IRoutes[] = [
	{
		path: '/charge/create',
		component: ChargeCreate,
		protected: true,
		displayName: 'Home'
	},
	{
		path: '/charge',
		component: ChargeList,
		protected: true,
		displayName: 'Minhas Cobranças',
		visible: true
	},
	{
		path: '/charge/:chargeId',
		component: ChargeView,
		protected: true,
		displayName: 'Minhas Cobranças'
	}
]

export default HomeRoute
