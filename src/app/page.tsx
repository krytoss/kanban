import Board from "@/components/Board";
import Column from "@/components/Column";
import Task from "@/components/Task";

export default function Home() {

	const columns = [
		{ id: 1, color: "#F0B8B4", title: "To-Do" },
		{ id: 2, color: "#B4E0F0", title: "In Progress" },
		{ id: 3, color: "#B4F0B8", title: "Done" },
	]

	const tasks = [
		{ id: 1, text: "Task 1", column_id: 1 },
		{ id: 2, text: "Task 2", column_id: 2 },
		{ id: 3, text: "Task 3", column_id: 2 },
	];

	return (
		<Board>
			{columns.map(column => (
				<Column key={column.id} color={column.color} title={column.title}>
					{tasks.filter(task => task.column_id === column.id).map(task => (
						<Task key={task.id} text={task.text} />
					))}
				</Column>
			))}
		</Board>
	);
}