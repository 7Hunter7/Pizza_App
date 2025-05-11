import ProductCard from '../../../components/ProductCard/ProductCard';
import type { MenuListProps } from './MenuList.props';

export function MenuList({products}: MenuListProps) {
  return (
    products.map(prod => (
      <ProductCard
        key={prod.id}
        id={prod.id}
        title={prod.name}
        description={prod.ingredients.join(', ')}
        rating={prod.rating}
        price={prod.price}
        image={prod.image}
      />))
    )
}