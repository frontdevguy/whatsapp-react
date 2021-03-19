import { AxiosError } from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export interface IAppContext {
	name?: string;
	handleRequestsError: (error: AxiosError) => void;
}

const initialContextValue: Pick<IAppContext, 'handleRequestsError'> = {
	handleRequestsError: () => {}
};

const Context = React.createContext<
	IAppContext | Pick<IAppContext, 'handleRequestsError'>
>(initialContextValue);

export const AppProvider: React.FC = ({ children }): JSX.Element => {
	const [name] = useState<string>('React Application');

	const handleRequestsError = (error: AxiosError) => {
		toast(
			error?.response?.data?.message ||
				'An error occurred, please try again',
			{
				icon: '🛑',
				style: {
					borderRadius: '5px',
					background: 'orangered',
					color: '#fff',
					padding: '20px'
				}
			}
		);
	};

	return (
		<Context.Provider value={{ name, handleRequestsError }}>
			{children}
		</Context.Provider>
	);
};

export const useAppState = () => {
	const context = React.useContext<IAppContext>(Context);
	if (context === undefined)
		throw new Error('useAppState must be used within a AppProvider');
	return context;
};
