import React from "react";
import { Navigate } from "react-router-dom";

// const AppRoute = ({
// 	component: Component,
// 	layout: Layout,
// 	isAuthProtected,
// 	...rest
// }) => (
// 		<Route
// 			{...rest}
// 			render={props => {

// 				if (isAuthProtected && !localStorage.getItem("authUser")) {
// 					return (
// 						<Navigate to={{ pathname: "/login", state: { from: props.location } }} />
// 					);
// 				}

// 				return (
// 					<Layout>
// 						<Component {...props} />
// 					</Layout>
// 				);
// 			}}
// 		/>
// 	);

const AppRoute = (props) => {
	try {
		console.log('Starting authentication check...');
		
		// Check if localStorage is available
		if (typeof window === 'undefined' || !window.localStorage) {
			console.error('localStorage is not available');
			return <Navigate to="/login" replace />;
		}

		// Get auth data
		const authUser = localStorage.getItem("authUser");
		console.log('Retrieved auth state:', { exists: !!authUser });

		if (!authUser) {
			console.log('No auth data found - redirecting to login');
			return <Navigate to="/login" replace />;
		}

		// Parse and validate auth data
		let parsedAuthUser;
		try {
			parsedAuthUser = JSON.parse(authUser);
			console.log('Auth data parsed successfully:', {
				hasToken: !!parsedAuthUser?.token,
				role: parsedAuthUser?.role
			});
		} catch (parseError) {
			console.error('Failed to parse auth data:', parseError);
			localStorage.removeItem("authUser");
			return <Navigate to="/login" replace />;
		}

		if (!parsedAuthUser || typeof parsedAuthUser !== 'object') {
			console.error('Invalid auth data structure');
			localStorage.removeItem("authUser");
			return <Navigate to="/login" replace />;
		}

		if (!parsedAuthUser.token) {
			console.error('Missing token in auth data');
			localStorage.removeItem("authUser");
			return <Navigate to="/login" replace />;
		}

		console.log('Authentication validated successfully');
		return props.children;
	} catch (error) {
		console.error('Critical authentication error:', {
			type: error.name,
			message: error.message,
			stack: error.stack
		});
		localStorage.removeItem("authUser");
		return <Navigate to="/login" replace />;
	}
}

export default AppRoute;

