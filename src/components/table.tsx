'use client';
import React, { ChangeEvent, useState } from 'react';
import debounce from 'lodash/debounce';
import { IUser } from '@/types';
import DialogEditUser from './dialogEditUser';
import AlertDeleteUser from './alertDeleteUser';
import DialogAddUser from './dialogAddUser';
import Magnifier from '/public/magnifier.svg';
import { api } from '@/services/api';
import Pagination from './pagination';

export default function Table({ users }: { users: IUser }) {
	const [usersNewArray, setUsersNewArray] = useState(users);
	const [currentPage, setCurrentPage] = useState(1);

	const updateTable = async () => {
		const response = await api.get(`/findUsers?page=${currentPage}`);
		setUsersNewArray(response.data);
	};

	const findUsers = async (searchValue: ChangeEvent<HTMLInputElement>) => {
		const response = await api.get(
			`/findUsers?search=${searchValue.target.value}`
		);
		setUsersNewArray(response.data);
	};

	const loadUsers = debounce(findUsers, 1000);

	return (
		<main className='flex h-screen bg-container'>
			<div className='m-auto flex w-5/6 flex-col justify-center rounded-lg bg-stone-50 p-5 shadow'>
				<section className='mb-3 flex flex-col justify-between md:flex-row'>
					<div className='flex w-full items-center rounded-lg border border-solid border-buttons bg-stone-50 p-1 md:w-1/6'>
						<Magnifier className='mr-3' />
						<input
							className='w-full bg-stone-50 font-body_1 text-body_1'
							placeholder='Pesquisar por'
							onChange={loadUsers}
						/>
					</div>
					<DialogAddUser updateTable={updateTable} />
				</section>

				<div>
					<table className='w-full table-fixed text-left font-body_1 text-body_1'>
						<thead>
							<tr className='bg-stone-200'>
								<th className='p-2 font-normal'>Nome</th>
								<th className='p-2 font-normal'>Email</th>
								<th className='w-2/12 p-2 font-normal'>Editar</th>
								<th className='w-3/12 p-2 font-normal'>Excluir</th>
							</tr>
						</thead>
						<tbody>
							{usersNewArray?.payload?.users?.map((item) => (
								<tr key={item.id}>
									<td className='p-2'>{item.name}</td>
									<td className='p-2'>{item.email}</td>
									<td className='p-2'>
										<DialogEditUser
											userId={item.id}
											name={item.name}
											email={item.email}
											updateTable={updateTable}
										/>
									</td>
									<td>
										<AlertDeleteUser
											updateTable={updateTable}
											userId={item.id}
										/>
									</td>
								</tr>
							))}
							{usersNewArray?.payload?.users?.length < 5 &&
								Array.from({
									length: 5 - usersNewArray.payload.users.length,
								}).map((_, index) => (
									<tr key={`empty-row-${index}`} className='h-10'></tr>
								))}
						</tbody>
					</table>
					<Pagination
						usersNewArray={usersNewArray}
						setUsersNewArray={setUsersNewArray}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>
			</div>
		</main>
	);
}
