export type Column = {
	id: number;
	color: string;
	title: string;
};

export type Task = {
	id: number;
	text: string;
	column_id: number;
};