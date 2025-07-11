type Props = {
	children?: React.ReactNode;
	color: string;
	title: string;
}

const Board: React.FC<Props> = ({ children, color, title }) => {
  	return (
		<div
			className="block w-100 rounded-lg overflow-hidden"
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

			<div className="px-2 py-6">
				{ /* content */ }
				{ children }
			</div>

		</div>
	);
}

export default Board;