import { useState, MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Route, Routes } from 'react-router-dom';

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
			<Input/>
			<Routes>
				<Route path='/' element={<Menu/>} />
				<Route path='/cart' element={<Cart/>} />
			</Routes>
		</>
	);
}

export default App;
