import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';

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
				<div className=' absolute h-[35px] w-full bg-buttons '></div>
				{children}
			</body>
		</html>
	);
}
