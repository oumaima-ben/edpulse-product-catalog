import { useCallback, useEffect, useState } from 'react';
import type { ProductsQuery, ProductsResponse } from '../types/product';

function resolveApiUrl(): string {
  const raw = import.meta.env.VITE_API_URL;
  if (raw === '') return '';
  if (!raw) return 'http://localhost:3000';
  if (raw.startsWith('http')) return raw.replace(/\/$/, '');
  return `https://${raw.replace(/\/$/, '')}`;
}

const API_URL = resolveApiUrl();

export function useProducts(query: ProductsQuery) {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set('page', String(query.page));
    params.set('limit', String(query.limit));
    if (query.category) params.set('category', query.category);
    if (query.stock_status) params.set('stock_status', query.stock_status);

    try {
      const response = await fetch(`${API_URL}/products?${params}`);
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message ?? `Request failed (${response.status})`);
      }
      const result: ProductsResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query.page, query.limit, query.category, query.stock_status]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, refetch: fetchProducts };
}
