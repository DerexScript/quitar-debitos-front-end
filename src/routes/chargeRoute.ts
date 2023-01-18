import ChargeCreate from 'pages/Charge/create'
import ChargeList from 'pages/Charge/list'
import ChargeView from 'pages/Charge/view'
import Invitation from 'pages/Charge/invitation'

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
	},
	{
		path: '/charge/invitation/:invitation_code',
		component: Invitation,
		protected: false,
		displayName: 'Convite De Cobrança'
	}
]

export default HomeRoute
