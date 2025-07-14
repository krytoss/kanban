import { FaPlus } from "react-icons/fa";
import { Column as ColumnType, Task as TaskType } from "@/app/types";
import Task from "./Task";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";

type Props = {
	column: ColumnType;
	tasks?: TaskType[];
	draggingTask: TaskType | null;
	isDragging?: boolean;
}

const Board: React.FC<Props> = ({ tasks, column, draggingTask, isDragging }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: `column-${column.id}`,
		data: {
			type: 'column',
			column
		}
	});

	const tasksIds = useMemo(() => tasks?.map(task => `task-${task.id}`) || [], [tasks]);

	if (isDragging) {
		return (
			<div
				style={{
					transform: CSS.Transform.toString(transform),
					transition,
				}}
				ref={setNodeRef}
				className="block w-80 rounded-md bg-gray-200 min-h-100 border-2 border-gray-400"
			>
				<div
					{...attributes}
					{...listeners}
					className="w-full py-8 text-center bg-gray-400"
				/>
			</div>
		)
	}

  	return (
		<SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
			<div
				style={{
					transform: CSS.Transform.toString(transform),
					transition,
					border: `2px solid ${column.color}`,
				}}
				ref={setNodeRef}
				className="block w-80 rounded-md bg-slate-100 min-h-100 overflow-visible"
			>

				<div
					{...attributes}
					{...listeners}
					className="w-full p-4 text-center cursor-grab"
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