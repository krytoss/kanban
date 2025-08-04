import { getDBSettings } from "@/helpers/db";
import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";

const connectionParams = getDBSettings();

// Handle a GET request to the /api/columns route
export async function GET(request: NextRequest) {
	try {
		const connection = await mysql.createConnection(connectionParams);
		const [ results ] = await connection.execute("SELECT * FROM columns");
		await connection.end();
		return NextResponse.json(results, { status: 200 });
	} catch (error) {
		console.error("Database connection error:", error);
		return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
	}
}