export interface IUser {
	payload: {
		users: {
			id: number;
			name: string;
			email: string;
			password: string;
		}[];
		totalPages: number;
	};
}
