'use client'

import Board from "@/components/Board";
import Column from "@/components/Column";
import Task from "@/components/Task";
import { closestCenter, closestCorners, DndContext, DragCancelEvent, DragEndEvent, DragOverEvent, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import { Task as TaskType, Column as ColumnType } from "@/app/types";
import { createPortal } from "react-dom";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function Home() {

	const [draggingTask, setDraggingTask] = useState<TaskType | null>(null);
	const [ columns, setColumns ] = useState<ColumnType[]>([
		{
			id: 1,
			color: "#F0B8B4",
			title: "To-Do"
		},
		{
			id: 2,
			color: "#B4E0F0",
			title: "In Progress"
		},
		{
			id: 3,
			color: "#B4F0B8",
			title: "Done"
		},
	]);

	const [ tasks, setTasks ] = useState<TaskType[]>([
		{
			id: 1,
			text: "Task 1",
			column_id: 1,
			order: 1
		},
		{
			id: 2,
			text: "Task 2",
			column_id: 1,
			order: 2
		},
		{
			id: 3,
			text: "Task 3",
			column_id: 1,
			order: 3
		},
		{
			id: 4,
			text: "Task 4",
			column_id: 1,
			order: 4
		},
		{
			id: 5,
			text: "Task 5",
			column_id: 2,
			order: 2
		},
		{
			id: 6,
			text: "Task 6",
			column_id: 3,
			order: 2
		}
	]);

	const tasksByColumn = useMemo(() => {
		const map = new Map<number, TaskType[]>();
		tasks.forEach(task => {
			if (!map.has(task.column_id)) {
				map.set(task.column_id, []);
			}
			map.get(task.column_id)!.push(task);
		});
		return map;
	}, [tasks]);

	const handleDragStart = (event: any) => {
		const taskId = event.active.data.current?.task.id;
		console.log("Dragging task ID:", event.active);
		const task = tasks.find(task => task.id === taskId);
		if (!task) return;
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

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id as string;
		const overId = over.id as string;

		if (activeId === overId) {
			return;
		}

		const isActiveTask = active.data.current?.type === 'task';
		const isOverTask = over.data.current?.type === 'task';

		if (isActiveTask && isOverTask) { // Moving task to another task
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex(task => `task-${task.id}` === activeId);
				const overIndex = tasks.findIndex(task => `task-${task.id}` === overId);

				if (tasks[activeIndex].column_id !== tasks[overIndex].column_id) {
					tasks[activeIndex].column_id = tasks[overIndex].column_id;
				}

				return arrayMove(tasks, activeIndex, overIndex);
			})
		} else if (isActiveTask && !isOverTask) { // Moving task to a column
			const columnId = over.data.current?.column.id as number;
			if (active.data.current?.task.column_id === columnId) {
				return; // No need to update if the task is already in the column
			}
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex(task => `task-${task.id}` === activeId);
				const task = tasks[activeIndex];
				task.column_id = columnId;
				return tasks
						.filter(t => t.id !== task.id)
						.concat({ ...task, column_id: columnId }); // This ensures the task is moved to the bottom of the new column
			});
		}
	}

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<Board>
        	<DndContext
				onDragEnd={handleDragEnd}
				onDragStart={handleDragStart}
				onDragCancel={handleDragCancel}
				collisionDetection={closestCenter}
				sensors={sensors}
				onDragOver={handleDragOver}
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