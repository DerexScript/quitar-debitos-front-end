import ChargeCreate from '../pages/Charge/create'
import IRoutes from './IRoutes'

const HomeRoute: IRoutes[] = [
	{
		path: '/charge/create',
		component: ChargeCreate,
		protected: true,
		displayName: 'Home'
	}
]

export default HomeRoute
