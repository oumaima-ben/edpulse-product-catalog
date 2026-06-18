import { Product } from '../../domain/entities/product.entity';
import { StockStatus } from '../../domain/enums/stock-status.enum';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 89.99, stock_status: StockStatus.IN_STOCK },
  { id: 2, name: 'Bluetooth Speaker', category: 'Electronics', price: 59.99, stock_status: StockStatus.LOW_STOCK },
  { id: 3, name: 'USB-C Hub', category: 'Electronics', price: 34.99, stock_status: StockStatus.IN_STOCK },
  { id: 4, name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock_status: StockStatus.OUT_OF_STOCK },
  { id: 5, name: '4K Monitor', category: 'Electronics', price: 349.99, stock_status: StockStatus.IN_STOCK },
  { id: 6, name: 'Cotton T-Shirt', category: 'Clothing', price: 24.99, stock_status: StockStatus.IN_STOCK },
  { id: 7, name: 'Denim Jeans', category: 'Clothing', price: 59.99, stock_status: StockStatus.LOW_STOCK },
  { id: 8, name: 'Winter Jacket', category: 'Clothing', price: 149.99, stock_status: StockStatus.IN_STOCK },
  { id: 9, name: 'Running Shoes', category: 'Clothing', price: 99.99, stock_status: StockStatus.OUT_OF_STOCK },
  { id: 10, name: 'Wool Sweater', category: 'Clothing', price: 79.99, stock_status: StockStatus.IN_STOCK },
  { id: 11, name: 'Organic Honey', category: 'Food', price: 12.99, stock_status: StockStatus.IN_STOCK },
  { id: 12, name: 'Extra Virgin Olive Oil', category: 'Food', price: 18.99, stock_status: StockStatus.LOW_STOCK },
  { id: 13, name: 'Dark Chocolate Bar', category: 'Food', price: 4.99, stock_status: StockStatus.IN_STOCK },
  { id: 14, name: 'Green Tea Pack', category: 'Food', price: 9.99, stock_status: StockStatus.OUT_OF_STOCK },
  { id: 15, name: 'Almond Butter', category: 'Food', price: 14.99, stock_status: StockStatus.IN_STOCK },
  { id: 16, name: 'Granola Mix', category: 'Food', price: 7.99, stock_status: StockStatus.LOW_STOCK },
  { id: 17, name: 'Smart Watch', category: 'Electronics', price: 199.99, stock_status: StockStatus.IN_STOCK },
  { id: 18, name: 'Leather Belt', category: 'Clothing', price: 39.99, stock_status: StockStatus.IN_STOCK },
  { id: 19, name: 'Protein Bars (12-pack)', category: 'Food', price: 22.99, stock_status: StockStatus.IN_STOCK },
  { id: 20, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock_status: StockStatus.LOW_STOCK },
];
