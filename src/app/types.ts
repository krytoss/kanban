export type Column = {
	id: number;
	color: string;
	title: string;
};

export type Task = {
	id: number;
	column_id: number;
	text: string;
	task_order: number;
	created: string;
};