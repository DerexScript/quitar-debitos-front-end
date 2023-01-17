import InviteDebtor from 'pages/InviteDebtor/view'

import IRoutes from './IRoutes'

const InviteDebtorRoute: IRoutes[] = [
	{
		path: '/invite-debtor/:chargeId',
		component: InviteDebtor,
		protected: true,
		displayName: 'Convidar Devedor'
	}
]

export default InviteDebtorRoute
