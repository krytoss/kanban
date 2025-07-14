'use client'

import Board from "@/components/Board";
import Column from "@/components/Column";
import Task from "@/components/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Task as TaskType } from "@/app/types";

export default function Home() {

	const [draggingTask, setDraggingTask] = useState<TaskType | null>(null);
	const columns = [
		{ id: 1, color: "#F0B8B4", title: "To-Do" },
		{ id: 2, color: "#B4E0F0", title: "In Progress" },
		{ id: 3, color: "#B4F0B8", title: "Done" },
	]

	const [ tasks, setTasks ] = useState<TaskType[]>([
		{ id: 1, text: "Task 1", column_id: 1 },
		{ id: 2, text: "Task 2", column_id: 2 },
		{ id: 3, text: "Task 3", column_id: 2 },
	]);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over) return;
	
		const taskId = active.id as number;
		const newColumn = over.id as TaskType['column_id'];
	
		setTasks(() =>
		  tasks.map((task) =>
			task.id === taskId
			  ? {
				  ...task,
				  column_id: newColumn,
				}
			  : task,
		  ),
		);
	  }

	return (
		<Board>
        	<DndContext
				onDragEnd={handleDragEnd}
				onDragStart={(event) => {
					setDraggingTask(tasks.find((task) => task.id === event.active.id as number) || null);
				}}
				onDragCancel={() => {
					setDraggingTask(null);
				}}
			>
				{columns.map(column => (
					<Column
						key={column.id}
						column={column}
						draggingTask={draggingTask}
						tasks={tasks.filter(task => task.column_id === column.id)}
					/>
				))}
			</DndContext>
		</Board>
	);
}