import { StockStatus } from '../types/product';

const CATEGORIES = ['Electronics', 'Clothing', 'Food'];

const STOCK_OPTIONS: { value: StockStatus; label: string }[] = [
  { value: StockStatus.IN_STOCK, label: 'In Stock' },
  { value: StockStatus.LOW_STOCK, label: 'Low Stock' },
  { value: StockStatus.OUT_OF_STOCK, label: 'Out of Stock' },
];

interface ProductFiltersProps {
  category: string;
  stockStatus: string;
  onCategoryChange: (value: string) => void;
  onStockStatusChange: (value: string) => void;
  onClear: () => void;
}

export function ProductFilters({
  category,
  stockStatus,
  onCategoryChange,
  onStockStatusChange,
  onClear,
}: ProductFiltersProps) {
  const hasFilters = category !== '' || stockStatus !== '';

  return (
    <div className="filters">
      <div className="filters__group">
        <label htmlFor="category-filter" className="filters__label">
          Category
        </label>
        <select
          id="category-filter"
          className="filters__select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label htmlFor="stock-filter" className="filters__label">
          Stock status
        </label>
        <select
          id="stock-filter"
          className="filters__select"
          value={stockStatus}
          onChange={(e) => onStockStatusChange(e.target.value)}
        >
          <option value="">All statuses</option>
          {STOCK_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <button type="button" className="filters__clear" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}
