import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const AlertDialogDemo = ({
	deleteUser,
	userId,
}: {
	deleteUser: (id: number) => Promise<void>;
	userId: number;
}) => {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<button>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M4.99996 15.8333C4.99996 16.75 5.74996 17.5 6.66663 17.5H13.3333C14.25 17.5 15 16.75 15 15.8333V5.83333H4.99996V15.8333ZM15.8333 3.33333H12.9166L12.0833 2.5H7.91663L7.08329 3.33333H4.16663V5H15.8333V3.33333Z'
							fill='black'
							fillOpacity='0.6'
						/>
					</svg>
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
							<button className='inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none'>
								Cancelar
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								onClick={() => deleteUser(userId)}
								className='inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none'
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

export default AlertDialogDemo;
