import { ProductCard } from './ProductCard';
import type { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function ProductList({ products, loading, error }: ProductListProps) {
  if (loading) {
    return (
      <div className="state-message" role="status">
        <div className="spinner" aria-hidden="true" />
        <p>Loading products…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-message state-message--error" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="state-message" role="status">
        <p>No products match your filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
