import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import IRoutes from '../routes/IRoutes';
import { Navigate } from 'react-router-dom';
export default ({
	route,
	children
}: {
	route: IRoutes;
	children: JSX.Element;
}) => {
	const auth = useContext(AuthContext);
	return (
		<>
			{!auth.credential && route.protected ? (
				<Navigate to='/login' />
			) : (
				children
			)}
		</>
	);
};
