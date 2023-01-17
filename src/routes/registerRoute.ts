import Register from 'pages/Register/view'
import IRoutes from './IRoutes'

const RegisterRoute: IRoutes[] = [
	{
		path: '/register',
		component: Register,
		protected: false,
		displayName: 'Registrar'
	},
	{
		path: '/register/:invitation_code',
		component: Register,
		protected: false,
		visible: false,
		displayName: 'Registrar'
	}
]

export default RegisterRoute
