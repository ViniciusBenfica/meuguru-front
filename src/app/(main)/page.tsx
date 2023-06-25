import React from 'react';
import Table from '@/components/table';
import { url } from '@/utils/url';

async function getUserData() {
	const response = await fetch(`${url}/findUsers?limit=5`, {
		cache: 'no-store',
	});

	return response.json();
}

export default async function Home() {
	const users = await getUserData();

	return <Table users={users} />;
}
