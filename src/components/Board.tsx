type Props = {
	children?: React.ReactNode;
}

const Board: React.FC<Props> = ({ children }) => {
  	return (
		<div className="block bg-gray-200 w-full h-screen">
			{
				children
			}
		</div>
	);
}

export default Board;