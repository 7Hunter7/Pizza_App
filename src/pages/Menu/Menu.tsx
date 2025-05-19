import { useEffect, useState, type ChangeEvent } from 'react';
import Headling from '../../components/Headling/Headling';
import { MenuList } from './MenuList/MenuList';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';

export default function Menu() {
	const [products, setProducts ] = useState<Product[]>([]);
	const [isLoading, setIsLoading ] = useState<boolean>(false);
	const [error, setError ] = useState<string | undefined>();
	const [filter, setFilter ] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);
	
	const getMenu = async(name?: string) => {
		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {name}
			});
			setProducts(data);
		} catch(err) {
			if (err instanceof AxiosError) setError(err.message)
			console.error('Error: ', err);
		}
		finally{
			setIsLoading(false);
		}
	};

	// Установка фильтра
	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles.head}>
        <Headling>Меню</Headling>
        <Search placeholder='Введите блюдо или состав' onChange={updateFilter}/>
			</div>
			<div>
				{error && <>Ошибка: {error}</>}
				{isLoading && <>Загрузка...</>}
				{!isLoading && products.length > 0 && <MenuList products={products}/>}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
			</div>
    </>
	);
};