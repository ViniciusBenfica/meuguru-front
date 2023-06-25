import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Meuguru',
	description: 'Teste aplication',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
				/>
				<div className=' absolute h-[35px] w-full bg-buttons'></div>
				{children}
			</body>
		</html>
	);
}
