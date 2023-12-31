import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import Delete from '/public/delete.svg';
import { api } from '@/services/api';
import { toast } from 'react-toastify';

const AlertDeleteUser = ({
	updateTable,
	userId,
}: {
	updateTable: () => Promise<void>;
	userId: number;
}) => {
	const deleteUser = async (id: number) => {
		try {
			await api.delete(`/deleteUser/${id}`);
			updateTable();
			toast.success('Usuario deletado');
		} catch (error) {
			toast.error('Não foi possível deletar o usuario');
		}
	};

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<button>
					<Delete />
				</button>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='fixed inset-0 bg-black opacity-70' />
				<AlertDialog.Content className='data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
					<AlertDialog.Title className='m-0 text-[17px] font-medium'>
						Deseja realmente excluir?
					</AlertDialog.Title>
					<AlertDialog.Description className='mb-5 mt-4 text-[15px]'>
						Deseja realmente excluir este usuario? Após confirmado a ação não
						poderá ser desfeita.
					</AlertDialog.Description>
					<div className='flex justify-end gap-[25px]'>
						<AlertDialog.Cancel asChild>
							<button className='inline-flex h-[35px] items-center justify-center rounded-[4px] bg-stone-300 px-[15px] font-medium'>
								Cancelar
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								onClick={() => deleteUser(userId)}
								className=' inline-flex h-[35px] items-center justify-center rounded-[4px] bg-red-300 px-[15px] font-medium'
							>
								Excluir
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default AlertDeleteUser;
