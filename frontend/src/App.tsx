import { useState } from 'react';
import { ProductFilters } from './components/ProductFilters';
import { ProductList } from './components/ProductList';
import { Pagination } from './components/Pagination';
import { useProducts } from './hooks/useProducts';
import { StockStatus } from './types/product';
import './App.css';

const PAGE_SIZE = 6;

function App() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('');

  const { data, loading, error } = useProducts({
    page,
    limit: PAGE_SIZE,
    category: category || undefined,
    stock_status: stockStatus ? (stockStatus as StockStatus) : undefined,
  });

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleStockStatusChange = (value: string) => {
    setStockStatus(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setCategory('');
    setStockStatus('');
    setPage(1);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">Product Catalog</h1>
        <p className="header__subtitle">Browse and filter our product inventory</p>
      </header>

      <main className="main">
        <ProductFilters
          category={category}
          stockStatus={stockStatus}
          onCategoryChange={handleCategoryChange}
          onStockStatusChange={handleStockStatusChange}
          onClear={handleClearFilters}
        />

        <ProductList
          products={data?.data ?? []}
          loading={loading}
          error={error}
        />

        {data && (
          <Pagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            total={data.meta.total}
            onPageChange={setPage}
          />
        )}
      </main>

      <footer className="footer">
        <p>Edpulse Technical Assessment</p>
      </footer>
    </div>
  );
}

export default App;
