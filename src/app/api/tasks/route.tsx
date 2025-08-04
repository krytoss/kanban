import { getDBSettings } from "@/helpers/db";
import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";
import { Task } from "@/app/types";

const connectionParams = getDBSettings();

// Handle a GET request to the /api/tasks route
export async function GET(request: NextRequest) {
	try {
		const connection = await mysql.createConnection(connectionParams);
		const params = new URL(request.url).searchParams;
		let results: Task[] = [];

		if (params.has('column_id')) { // If column_id is provided, filter tasks by column
			// Validate column_id parameter
			const columnId = params.get('column_id');
			if (!columnId) {
				return NextResponse.json({ error: "Column ID is required" }, { status: 400 });
			}
			const [ res ] = await connection.execute("SELECT * FROM tasks WHERE column_id = ?", [columnId]);
			results = res as Task[];
		} else if (params.has('board_id')) { // If board_id is provided, filter tasks by board
			// Assuming tasks are linked to columns, which are linked to boards
			const boardId = params.get('board_id');
			if (!boardId) {
				return NextResponse.json({ error: "Board ID is required" }, { status: 400 });
			}
			const [ res ] = await connection.execute("SELECT * FROM tasks WHERE column_id IN (SELECT ID FROM columns WHERE board_id = ?)", [boardId]);
			results = res as Task[];
		} else { // If no parameters are provided, fetch all tasks
			const [ res ] = await connection.execute("SELECT * FROM tasks");
			results = res as Task[];
		}

		await connection.end();
		return NextResponse.json(results, { status: 200 });
	} catch (error) {
		console.error("Database connection error:", error);
		return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
	}
}