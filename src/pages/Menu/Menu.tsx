import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios from 'axios';

export function Menu() {
	const [products, setProducts ] = useState<Product[]>([]);
	const [isLoading, setIsLoading ] = useState<boolean>(false);

	const getMenu = async() => {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(() => {resolve()}, 2000 ) 
			})

			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
		} catch(err) {
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
				{!isLoading && products.map(prod => (
					<ProductCard
						key={prod.id}
						id={prod.id}
						title={prod.name}
						description={prod.ingredients.join(', ')}
						rating={prod.rating}
						price={prod.price}
						image={prod.image}
					/>
				))}
				{isLoading && <>Загрузка...</>}
			</div>
    </>
	);
};