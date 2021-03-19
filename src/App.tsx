import React, { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { AppProvider } from './contexts/AppContext';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

export default () => {
	return (
		// wrap with layout
		<AppProvider>
			<Router>
				<Suspense fallback={<div>Page is Loading...</div>}>
					<Toaster position='top-right' reverseOrder={false} />
					<Switch>
						<Switch>
							<Route path='/' component={Login} />
							<Route path='/home' exact component={Home} />
						</Switch>
					</Switch>
				</Suspense>
			</Router>
		</AppProvider>
	);
};
