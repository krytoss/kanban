type Props = {
	text: string;
}

const Task: React.FC<Props> = ({ text }) => {
	return (
		<div className="bg-white px-4 py-2 rounded shadow mb-2 text-slate-600">
			<p>{text}</p>
		</div>
	);
};

export default Task;