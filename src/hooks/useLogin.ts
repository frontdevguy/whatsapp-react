import React, { useState } from 'react';
import axios from 'axios';
import { useAppState } from '../contexts/AppContext';

interface IHandleLogin {
    (): void;
}

export interface IUserLogin {
	email: string,
	password: string,
	hasError?: boolean,
	isLoading: boolean,
	handleLogin: IHandleLogin,
	handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void,
}

export default function () : IUserLogin {
	const [email, setEmail] = useState <string> ('');
	const [password, setPassword] = useState<string>('');
	const { handleRequestsError } = useAppState()
	const [ isLoading, setIsLoading ] = useState<boolean>(false)

	const handleLogin = () => {
		setIsLoading(true);
		axios.post('http://localhost:4000/login', { email, password })
			.then(response => {
				setIsLoading(false);
				console.log({response})
			}).catch((error) => {
				setIsLoading(false);
				handleRequestsError(error)
			})
	};

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.type === 'password')
			setPassword(e.currentTarget.value);
		if (e.currentTarget.type === 'email') setEmail(e.currentTarget.value);
	};

	return {
		email,
		password,
		isLoading,
		handleLogin,
		handleInputChange
	};
}
