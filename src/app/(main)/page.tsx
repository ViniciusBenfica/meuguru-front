import React from 'react';
import Table from '@/components/table';

async function getUserData() {
	const response = await fetch('http://localhost:4000/findUsers?limit=2', {
		cache: 'no-store',
	});

	return response.json();
}

export default async function Home() {
	const users = await getUserData();

	return (
		<div>
			<Table users={users} />
		</div>
	);
}
