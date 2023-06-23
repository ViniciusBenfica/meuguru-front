import React from 'react';

export default function Home() {
	return (
		<div className='flex h-screen bg-container'>
			<div className='m-auto flex w-5/6 flex-col justify-center bg-stone-100'>
				<div className='mb-3 flex w-1/6 items-center rounded-lg border border-solid border-black bg-stone-200 p-1'>
					<span>
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
						className='w-full bg-stone-200  font-body_1 text-body_1'
						placeholder='Pesquisar por'
					/>
				</div>
				<div>
					<table className='w-full table-fixed text-left font-body_1 text-body_1'>
						<thead>
							<tr className='bg-stone-200'>
								<th className='py-2 font-normal'>Nome</th>
								<th className='py-2 font-normal'>Email</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='py-2'>Witchy Woman</td>
								<td className='py-2'>1961</td>
							</tr>
							<tr>
								<td className='py-2'>Witchy Woman</td>
								<td className='py-2'>1972</td>
							</tr>
							<tr>
								<td className='py-2'>Shining Star</td>
								<td className='py-2'>1975</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
