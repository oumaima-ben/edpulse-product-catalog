import type { Product } from '../types/product';
import { StockStatus } from '../types/product';

const STOCK_LABELS: Record<StockStatus, string> = {
  [StockStatus.IN_STOCK]: 'In Stock',
  [StockStatus.LOW_STOCK]: 'Low Stock',
  [StockStatus.OUT_OF_STOCK]: 'Out of Stock',
};

const STOCK_CLASS: Record<StockStatus, string> = {
  [StockStatus.IN_STOCK]: 'badge--in-stock',
  [StockStatus.LOW_STOCK]: 'badge--low-stock',
  [StockStatus.OUT_OF_STOCK]: 'badge--out-of-stock',
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__header">
        <h3 className="product-card__name">{product.name}</h3>
        <span className={`badge ${STOCK_CLASS[product.stock_status]}`}>
          {STOCK_LABELS[product.stock_status]}
        </span>
      </div>
      <p className="product-card__category">{product.category}</p>
      <p className="product-card__price">${product.price.toFixed(2)}</p>
    </article>
  );
}
