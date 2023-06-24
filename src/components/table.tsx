'use client';
import React, { ChangeEvent, useState } from 'react';
import debounce from 'lodash/debounce';
import { IUser } from '@/types';
import DialogDemo from './dialog';
import AlertDialogDemo from './alert';
import axios from 'axios';

export default function Table({ users }: { users: IUser }) {
	const [usersNewArray, setUsersNewArray] = useState(users);
	const [currentPage, setCurrentPage] = useState(1);

	const updateTable = async () => {
		const response = await axios.get(
			`http://localhost:4000/findUsers?page=${currentPage}`
		);
		setUsersNewArray(response.data);
	};

	const nextPage = async () => {
		if (currentPage >= usersNewArray.payload.totalPages) return;
		const response = await axios.get(
			`http://localhost:4000/findUsers?page=${currentPage + 1}`
		);
		setUsersNewArray(response.data);
		setCurrentPage(currentPage + 1);
	};

	const previewPage = async () => {
		if (currentPage <= 1) return;
		const response = await axios.get(
			`http://localhost:4000/findUsers?page=${currentPage - 1}`
		);
		setUsersNewArray(response.data);
		setCurrentPage(currentPage - 1);
	};

	const deleteUser = async (id: number) => {
		await axios.delete(`http://localhost:4000/deleteUser/${id}`);
		updateTable();
	};

	const updateUser = async (id: number, name: string, email: string) => {
		await axios.put(`http://localhost:4000/updateUser/${id}`, {
			name,
			email,
		});
		updateTable();
	};

	const handlePageChange = async (page: number) => {
		const response = await axios.get(
			`http://localhost:4000/findUsers?page=${page}`
		);
		setCurrentPage(page);
		setUsersNewArray(response.data);
	};

	const findUsers = async (searchValue: ChangeEvent<HTMLInputElement>) => {
		const response = await axios.get(
			`http://localhost:4000/findUsers?search=${searchValue.target.value}`
		);
		setUsersNewArray(response.data);
	};

	const loadUsers = debounce(findUsers, 1000);

	return (
		<div className='flex h-screen bg-container'>
			<div className='m-auto flex w-5/6 flex-col justify-center rounded-lg bg-stone-50 p-6 shadow'>
				<div className='mb-3 flex w-1/6 items-center rounded-lg border border-solid border-gray-400 bg-stone-50 p-1'>
					<span className='mr-3'>
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.9167 9.66667H10.2583L10.025 9.44167C10.8417 8.49167 11.3333 7.25833 11.3333 5.91667C11.3333 2.925 8.90833 0.5 5.91667 0.5C2.925 0.5 0.5 2.925 0.5 5.91667C0.5 8.90833 2.925 11.3333 5.91667 11.3333C7.25833 11.3333 8.49167 10.8417 9.44167 10.025L9.66667 10.2583V10.9167L13.8333 15.075L15.075 13.8333L10.9167 9.66667ZM5.91667 9.66667C3.84167 9.66667 2.16667 7.99167 2.16667 5.91667C2.16667 3.84167 3.84167 2.16667 5.91667 2.16667C7.99167 2.16667 9.66667 3.84167 9.66667 5.91667C9.66667 7.99167 7.99167 9.66667 5.91667 9.66667Z'
								fill='black'
								fillOpacity='0.6'
							/>
						</svg>
					</span>
					<input
						className='w-full bg-stone-50 font-body_1 text-body_1'
						placeholder='Pesquisar por'
						onChange={loadUsers}
					/>
				</div>
				<div>
					<table className='w-full table-fixed text-left font-body_1 text-body_1'>
						<thead>
							<tr className='bg-stone-200'>
								<th className='p-2 font-normal'>Nome</th>
								<th className='p-2 font-normal'>Email</th>
								<th className='p-2 font-normal'>Editar</th>
								<th className='p-2 font-normal'>Excluir</th>
							</tr>
						</thead>
						<tbody>
							{usersNewArray?.payload?.users?.map((item) => (
								<tr key={item.id}>
									<td className='p-2'>{item.name}</td>
									<td className='p-2'>{item.email}</td>
									<td className='p-2'>
										<DialogDemo
											updateUser={updateUser}
											userId={item.id}
											name={item.name}
											email={item.email}
										/>
									</td>
									<td>
										<AlertDialogDemo deleteUser={deleteUser} userId={item.id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<nav>
						<ul className='flex justify-end'>
							<li>
								<div
									onClick={() => previewPage()}
									className='border border-solid border-gray-400 px-3 py-2'
								>
									Anterior
								</div>
							</li>
							{Array.from(
								{ length: usersNewArray?.payload?.totalPages },
								(_, index) => {
									const startPage = currentPage - 2;
									const endPage = currentPage + 2;
									if (index + 1 >= startPage && index + 1 <= endPage) {
										return (
											<div key={index}>
												<button
													onClick={() => handlePageChange(index + 1)}
													className={`${
														currentPage === index + 1
															? 'bg-cyan-800 text-white'
															: 'bg-white text-gray-500'
													} h-full border border-solid border-gray-400 px-3 leading-tight`}
												>
													{index + 1}
												</button>
											</div>
										);
									}
								}
							)}
							<li>
								<div
									onClick={() => nextPage()}
									className='border border-solid border-gray-400 px-3 py-2'
								>
									Proximo
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
}
