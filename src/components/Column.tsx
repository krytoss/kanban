import { FaPlus } from "react-icons/fa";

type Props = {
	children?: React.ReactNode;
	color: string;
	title: string;
}

const Board: React.FC<Props> = ({ children, color, title }) => {
  	return (
		<div
			className="block w-80 rounded-md overflow-hidden bg-slate-100 min-h-100"
			style={{
				border: `2px solid ${color}`,
			}}
		>

			<div
				className="w-full p-4 text-center"
				style={{
					backgroundColor: color,
				}}
			> { /* header */ }
				{title}
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