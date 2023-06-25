'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Edit from '/public/edit.svg';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services/api';
import { toast } from 'react-toastify';

const validationSchema = z.object({
	name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
	email: z.string().email('Email inválido'),
});
type FormValues = z.infer<typeof validationSchema>;

const DialogEditUser = ({
	name,
	email,
	userId,
	updateTable,
}: {
	name: string;
	email: string;
	userId: number;
	updateTable: () => Promise<void>;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const { formState, handleSubmit, register, reset } = useForm<FormValues>({
		resolver: zodResolver(validationSchema),
		mode: 'onChange',
		defaultValues: {
			name,
			email,
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			await api.put(`/updateUser/${userId}`, data);
			updateTable();
			reset();
			setIsOpen(false);
			toast.success('Usuario editado');
		} catch (error) {
			toast.error('Não foi possível editar o usuario');
		}
	};
	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild>
				<button>
					<Edit />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<form onSubmit={handleSubmit(onSubmit)}>
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
							<div>
								<input
									className='inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px]  shadow-[0_0_0_1px]  focus:shadow-[0_0_0_1px]'
									id='name'
									{...register('name')}
								/>
								<p className='mt-1 text-xs text-red-500'>
									{formState.errors?.name?.message}
								</p>
							</div>
						</fieldset>
						<fieldset className='mb-[15px] flex items-center gap-5'>
							<label className='w-[90px] text-right text-[15px]' htmlFor='name'>
								Email
							</label>
							<div>
								<input
									className='inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px]  shadow-[0_0_0_1px]  focus:shadow-[0_0_0_1px]'
									id='email'
									{...register('email')}
								/>
								<p className='mt-1 text-xs text-red-500'>
									{formState.errors?.email?.message}
								</p>
							</div>
						</fieldset>
						<div className='mt-[25px] flex justify-end'>
							<button
								type='submit'
								disabled={!formState.isValid}
								className='inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green-200 px-[15px] font-medium'
							>
								Salvar mudanças
							</button>
						</div>
						<Dialog.Close asChild>
							<button className='absolute right-[10px] top-[10px] '>
								<Cross2Icon />
							</button>
						</Dialog.Close>
					</Dialog.Content>
				</form>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default DialogEditUser;
