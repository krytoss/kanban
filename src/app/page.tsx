import Board from "@/components/Board";
import Column from "@/components/Column";
import Task from "@/components/Task";

export default function Home() {
	return (
		<Board>
			<Column color="#F0B8B4" title="To-Do">
				<Task text="Task 1" />
			</Column>
		</Board>
	);
}