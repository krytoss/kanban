import { useDroppable } from "@dnd-kit/core";
import { FaPlus } from "react-icons/fa";
import { Column as ColumnType } from "@/app/types";

type Props = {
	column: ColumnType;
	children?: React.ReactNode;
}

const Board: React.FC<Props> = ({ children, column }) => {
	const { setNodeRef } = useDroppable({
		id: column.id,
	});

  	return (
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
				{ /* content */ }
				{ children }
			</div>

			<div className="w-8 h-8 mt-4 bg-slate-800 rounded-full m-auto flex items-center justify-center hover:bg-slate-700 cursor-pointer">
				<FaPlus className="text-white" />
			</div>

		</div>
	);
}

export default Board;