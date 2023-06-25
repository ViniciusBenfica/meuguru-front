'use client';

import React from 'react';
import { api } from '@/services/api';
import { IUser } from '@/types';

const Pagination = ({
	usersNewArray,
	setUsersNewArray,
	currentPage,
	setCurrentPage,
}: {
	usersNewArray: IUser;
	setUsersNewArray: React.Dispatch<React.SetStateAction<IUser>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const nextPage = async () => {
		if (currentPage >= usersNewArray.payload.totalPages) return;
		const response = await api.get(`/findUsers?page=${currentPage + 1}`);
		setUsersNewArray(response.data);
		setCurrentPage(currentPage + 1);
	};

	const previewPage = async () => {
		if (currentPage <= 1) return;
		const response = await api.get(`/findUsers?page=${currentPage - 1}`);
		setUsersNewArray(response.data);
		setCurrentPage(currentPage - 1);
	};

	const handlePageChange = async (page: number) => {
		const response = await api.get(`/findUsers?page=${page}`);
		setCurrentPage(page);
		setUsersNewArray(response.data);
	};

	const hasPreviousPage = currentPage > 1;
	const hasNextPage = currentPage < usersNewArray.payload.totalPages;

	return (
		<nav>
			<ul className='mt-4 flex justify-end'>
				<li>
					<button
						onClick={() => previewPage()}
						className={`${
							hasPreviousPage
								? 'border border-solid border-buttons px-3 py-2'
								: 'border border-solid bg-gray-300 px-3 py-2'
						}`}
						disabled={!hasPreviousPage}
					>
						Anterior
					</button>
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
												? 'bg-buttons text-white'
												: 'bg-white text-gray-500'
										} border-gray-buttons h-full border border-solid px-3 leading-tight`}
									>
										{index + 1}
									</button>
								</div>
							);
						}
					}
				)}
				<li>
					<button
						onClick={() => nextPage()}
						className={`${
							hasNextPage
								? 'border border-solid border-buttons px-3 py-2'
								: 'border border-solid bg-gray-300 px-3 py-2'
						}`}
						disabled={!hasNextPage}
					>
						Proximo
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
