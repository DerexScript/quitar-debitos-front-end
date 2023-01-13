import Login from 'pages/Login/view'
import IRoutes from './IRoutes'

const LoginRoute: IRoutes[] = [
	{
		path: '/login',
		component: Login,
		protected: false,
		displayName: 'Login'
	}
]

export default LoginRoute
