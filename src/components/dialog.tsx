'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const DialogDemo = ({
	name,
	email,
	userId,
	updateUser,
}: {
	name: string;
	email: string;
	userId: number;
	updateUser: (id: number, name: string, email: string) => Promise<void>;
}) => {
	const [updatedName, setUpdatedName] = useState(name);
	const [updatedEmail, setUpdatedEmail] = useState(email);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedName(e.target.value);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedEmail(e.target.value);
	};
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button>
					<svg
						width='19'
						height='19'
						viewBox='0 0 19 19'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM17.71 5.04C18.1 4.65 18.1 4.02 17.71 3.63L15.37 1.29C14.98 0.899998 14.35 0.899998 13.96 1.29L12.13 3.12L15.88 6.87L17.71 5.04Z'
							fill='black'
							fillOpacity='0.6'
						/>
					</svg>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black opacity-70' />
				<Dialog.Content className='data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
					<Dialog.Title className='m-0 text-[17px] font-medium'>
						Editar usuario
					</Dialog.Title>
					<Dialog.Description className='mb-5 mt-4 text-[15px]'>
						Faça alterações do usuario aqui. Clique em salvar quando terminar.
					</Dialog.Description>
					<fieldset className='mb-[15px] flex items-center gap-5'>
						<label className='w-[90px] text-right text-[15px]' htmlFor='name'>
							Nome
						</label>
						<input
							className=' inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px]  shadow-[0_0_0_1px]  focus:shadow-[0_0_0_1px]'
							id='name'
							defaultValue={name}
							onChange={handleNameChange}
						/>
					</fieldset>
					<fieldset className='mb-[15px] flex items-center gap-5'>
						<label className='w-[90px] text-right text-[15px]' htmlFor='name'>
							Email
						</label>
						<input
							className=' inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px]  shadow-[0_0_0_1px]  focus:shadow-[0_0_0_1px]'
							id='name'
							defaultValue={email}
							onChange={handleEmailChange}
						/>
					</fieldset>
					<div className='mt-[25px] flex justify-end'>
						<Dialog.Close asChild>
							<button
								onClick={() => updateUser(userId, updatedName, updatedEmail)}
								className='bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
							>
								Salvar mudanças
							</button>
						</Dialog.Close>
					</div>
					<Dialog.Close asChild>
						<button className='absolute right-[10px] top-[10px] '>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default DialogDemo;
