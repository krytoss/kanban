import { useDraggable } from "@dnd-kit/core";
import { Task as TaskType } from "@/app/types";

type Props = {
	task: TaskType;
	isDragging?: boolean;
}

const Task: React.FC<Props> = ({ task, isDragging }) => {

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: `task-${task.id}`,
		data: {
			task
		}
	});

	const style = transform
		? {
			transform: `translate(${transform.x}px, ${transform.y}px)`,
		}
		: undefined;

	return (
		isDragging ?
			<div
				className="bg-gray-200 px-4 py-5 rounded shadow-md mt-2 text-slate-600"
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