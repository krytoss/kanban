'use client'

import Board from "@/components/Board";
import Column from "@/components/Column";
import Task from "@/components/Task";
import { DndContext, DragCancelEvent, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import { Task as TaskType } from "@/app/types";
import { createPortal } from "react-dom";

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

	const handleDragStart = (event: any) => {
		const taskId = event.active.data.current?.task.id;
		console.log("Dragging task ID:", event.active);
		const task = tasks.find(task => task.id === taskId) || null;
		setDraggingTask(task);
	}

	const handleDragEnd = (event: DragEndEvent) => {
		setDraggingTask(null);
		/* const { active, over } = event;
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
		); */
	  }

	const handleDragCancel = (event: DragCancelEvent) => {
		setDraggingTask(null);
	}

	return (
		<Board>
        	<DndContext
				onDragEnd={handleDragEnd}
				onDragStart={handleDragStart}
				onDragCancel={handleDragCancel}
			>
				{columns.map(column => (
					<Column
						key={column.id}
						column={column}
						draggingTask={draggingTask}
						tasks={tasks.filter(task => task.column_id === column.id)}
					/>
				))}
				{
					createPortal(
						<DragOverlay>
							{ draggingTask && <Task task={draggingTask} /> }
						</DragOverlay>,
						document.body
					)
				}
			</DndContext>
		</Board>
	);
}