import { useState, MouseEvent } from 'react';
import Button from './components/Button/Button';

function App() {
	const [counter, setCounter] = useState<number>(0);

	const addCounter = (e: MouseEvent) => {
		console.log(e.target);
		setCounter(counter + 1);
	};

	return (
		<>
			<Button onClick={addCounter}>{counter ? counter : 'Счетичик 1'}</Button>
			<Button appearence='big' onClick={addCounter}>{counter ? counter : 'Счетичик 2'}</Button>
		</>
	);
}

export default App;
