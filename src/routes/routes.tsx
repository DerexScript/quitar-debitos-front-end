import HomeRoute from 'routes/homeRoute'
import LoginRoute from 'routes/loginRoute'
import ChargeRoute from 'routes/chargeRoute'
import InviteDebtorRoute from './inviteDebtor'
import RegisterRoute from './registerRoute'

const routes = [
	...HomeRoute,
	...LoginRoute,
	...ChargeRoute,
	...InviteDebtorRoute,
	...RegisterRoute
]

export default routes
