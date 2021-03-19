import axios from 'axios';
import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';

import { useAppState } from '../contexts/AppContext';
import add5ToNumber from '../utilities/calculate';

export default (): JSX.Element => {
	const [qrString, setQrString] = useState('');
	useEffect(() => {
		function getQRCode() {
			axios
				.get('http://localhost:4000/connect')
				.then(function (response) {
					setQrString(response.data?.qrCode);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		return getQRCode();
	}, []);
	const { name } = useAppState();
	const age: number = add5ToNumber(22);
	return (
		<>
			<p style={{ marginBottom: '20px' }}>
				{' '}
				Scan code to connect your whatsapp application{' '}
			</p>
			{qrString ? (
				<div
					style={{
						height: '300px',
						width: '300px',
						margin: '0 auto'
					}}
				>
					<QRCode size={300} value={qrString} />
				</div>
			) : (
				<p> Loading QR Code, please wait ... </p>
			)}
		</>
	);
};
