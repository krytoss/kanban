import { Task as TaskType } from "@/app/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
	task: TaskType;
	isDragging?: boolean;
}

const Task: React.FC<Props> = ({ task, isDragging }) => {

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: `task-${task.id}`,
		data: {
			type: 'task',
			task
		}
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	return (
		isDragging ?
			<div
				ref={setNodeRef}
				{...listeners}
				{...attributes}
				style={ style }
				className="bg-gray-200 px-4 py-5 rounded shadow-md mt-2 text-slate-600 border-2 border-gray-400 opacity-70"
			/> :
			<div
				ref={setNodeRef}
				{...listeners}
				{...attributes}
				className="bg-white px-4 py-2 rounded shadow-md mt-2 text-slate-600 cursor-grab"
				style={ style }
			>
				<p>{task.text}</p>
			</div>
	);
};

export default Task;