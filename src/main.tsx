import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));
const Success = lazy(() => import('./pages/Success/Success'));

const router = createBrowserRouter([
	{
		path:'/' ,
		element: <RequireAuth><Layout/></RequireAuth>,
		children: [
			{
				path:'/' ,
				element: <Suspense fallback={<>Загрузка...</>}><Menu/></Suspense>
			},
			{
				path:'/cart' ,
				element: <Cart/>
			}, 
			{
				path:'/product/:id' ,
				element: <Product/>,
				errorElement: <>Ошибка загрузки данных</>,
				loader: async ({params}) => {
					await new Promise<void>((resolve) => {
						setTimeout(() => {resolve()}, 2000 ) 
					})
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			},
			{
				path:'/success' ,
				element: <Suspense fallback={<>Загрузка...</>}><Success/></Suspense>
			},
		]
	},
	{
		path:'/auth' ,
		element: <AuthLayout/>,
		children: [
			{
				path:'/login' ,
				element: <Login/>
			},
			{
				path:'/register' ,
				element: <Register/>
			}
		]
	},
	{
		path:'*' ,
		element: <Error/>
	}  
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</StrictMode>
);
