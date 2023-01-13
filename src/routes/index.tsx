import React from 'react'
import {
	Routes as Switch,
	Route,
	BrowserRouter as Router,
	Navigate
} from 'react-router-dom'
import { AuthProvider } from 'context/AuthContext'
import Guard from 'guard'
import routes from './routes'
/*

<Route path='/login' element={<Login />} />
*/
function Routes(): JSX.Element {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					{routes.map((route, key) => (
						<Route
							key={key}
							path={route.path}
							element={
								<Guard route={route}>
									<route.component />
								</Guard>
							}
						/>
					))}
					<Route path='*' element={<Navigate to='/Login' />} />
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default Routes
