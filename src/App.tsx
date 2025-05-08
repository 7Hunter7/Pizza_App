import { useState, MouseEvent } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error } from './pages/Error/Error';

const router = createBrowserRouter([
	{
		path:'/' ,
		element: <Menu/>
	},
	{
		path:'/cart' ,
		element: <Cart/>
	},
	{
		path:'*' ,
		element: <Error/>
	}
]);


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
			<div>
				<a href='/'>Меню</a>
				<a href='/cart'>Корзина</a>
			</div>
			<RouterProvider router={router}/>
		</>
	);
}

export default App;
