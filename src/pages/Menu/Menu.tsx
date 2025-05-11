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

	const getMenu = async() => {
		try {
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
		} catch(err) {
			console.error('Error: ', err);
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
				{products.map(prod => (
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
			</div>
    </>
	);
};