import './styles/login.css';

import React from 'react';

import useLogin, { IUserLogin } from '../hooks/useLogin';

export default (): JSX.Element => {
	const {
		handleInputChange,
		handleLogin,
		email,
		isLoading,
		password
	}: IUserLogin = useLogin();

	return (
		<form
			style={{
				margin: '20vh auto'
			}}
			onSubmit={e => e.preventDefault()}
		>
			<div>
				<label> Email: </label>
				<input
					type='email'
					value={email}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<label> Password: </label>
				<input
					type='password'
					value={password}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<button type='button' onClick={handleLogin}>
					{' '}
					{isLoading ? '... loading' : 'Login'}
				</button>
			</div>
		</form>
	);
};
