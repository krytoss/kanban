type Props = {
	children?: React.ReactNode;
	color: string;
	title: string;
}

const Board: React.FC<Props> = ({ children, color, title }) => {
  	return (
		<div
			className="block w-80 rounded-lg overflow-hidden bg-slate-100"
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

			<div className="px-2 pt-2 min-h-100">
				{ /* content */ }
				{ children }
			</div>

		</div>
	);
}

export default Board;