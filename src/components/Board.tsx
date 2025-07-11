type Props = {
	children?: React.ReactNode;
}

const Board: React.FC<Props> = ({ children }) => {
  	return (
		<div className="block bg-gray-100 w-full h-screen p-10 flex items-start gap-4 ">
			{
				children
			}
		</div>
	);
}

export default Board;