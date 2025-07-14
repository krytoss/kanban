import { useDroppable } from "@dnd-kit/core";
import { FaPlus } from "react-icons/fa";
import { Column as ColumnType, Task as TaskType } from "@/app/types";
import Task from "./Task";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo } from "react";

type Props = {
	column: ColumnType;
	tasks?: TaskType[];
	draggingTask: TaskType | null;
}

const Board: React.FC<Props> = ({ tasks, column, draggingTask }) => {
	const { setNodeRef, isOver } = useDroppable({
		id: `column-${column.id}`,
		data: {
			type: 'column',
			column
		}
	});

	const tasksIds = useMemo(() => tasks?.map(task => `task-${task.id}`) || [], [tasks]);

	const isOverAnother = isOver && draggingTask && draggingTask.column_id !== column.id;

  	return (
		<SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
			<div
				ref={setNodeRef}
				className="block w-80 rounded-md overflow-hidden bg-slate-100 min-h-100 overflow-visible"
				style={{
					border: `2px solid ${column.color}`,
				}}
			>

				<div
					className="w-full p-4 text-center"
					style={{
						backgroundColor: column.color,
					}}
				> { /* header */ }
					{column.title}
				</div>

				<div className="px-2 pb-2">
						{
							tasks?.map(task => (
								<Task
									key={task.id}
									task={task}
									isDragging={draggingTask?.id === task.id}
								/>
							))
						}
				</div>

				<div className="w-8 h-8 mt-4 bg-slate-800 rounded-full m-auto flex items-center justify-center hover:bg-slate-700 cursor-pointer">
					<FaPlus className="text-white" />
				</div>

			</div>
		</SortableContext>
	);
}

export default Board;