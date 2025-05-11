import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import { MenuList } from './MenuList/MenuList';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';

export function Menu() {
	const [products, setProducts ] = useState<Product[]>([]);
	const [isLoading, setIsLoading ] = useState<boolean>(false);
	const [error, setError ] = useState<string | undefined>();

	const getMenu = async() => {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(() => {resolve()}, 2000 ) 
			})

			const {data} = await axios.get<Product[]>(`${PREFIX}/prodcucts`);
			setProducts(data);
		} catch(err) {
			if (err instanceof AxiosError) setError(err.message)
			console.error('Error: ', err);
		}
		finally{
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getMenu();
	}, [])

	return (
		<>
			<div className={styles.head}>
        <Headling>Меню</Headling>
        <Search placeholder='Введите блюдо или состав'/>
			</div>
			<div>
				{error && <>Ошибка: {error}</>}
				{isLoading && <>Загрузка...</>}
				{!isLoading && <MenuList products={products}/>}
			</div>
    </>
	);
};