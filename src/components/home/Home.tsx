import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { User } from '../login/Login.type';

import styles from './Home.module.scss';
import addProduct from './addProduct';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface Props {
  user: User;
}

const Home: React.FC<Props> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortKey, setSortKey] = useState<keyof Product>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [productName, setproductName] = useState<string>('');
  const [productPrice, setproductPrice] = useState<number>(0);
  const [productDescription, setproductDescription] = useState<string>('');
  const [error, setError] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof Product) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const addNewProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newProduct: Product = {
      id: products.length + 1,
      title: productName,
      description: productDescription,
      price: productPrice,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: [],
    };

    try {
      const productResult = await addProduct(newProduct);

      if(productResult) {
        setProducts([...products, newProduct]);
      } else {
        setError('Encountered error, try again later!');  
      }
      
    } catch (error) {
      setError('Encountered error, try again later!');
      console.error('Error:', error);
    } finally {
      // setLoading(false);
    }

  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHeader}>
        <h2>{`Welcome, ${user.firstName}!`}</h2>        
      </div>
      <div className={styles.homeProductTableContainer}>
        <div className={styles.homeTableContainer}>
          <div className={styles.homeProductSearch}>
              <label htmlFor="search">{'Search'}</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          
          <div className={styles.homeTable}>
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>{`ID ${sortKey === 'id'  ? (sortOrder === 'asc' ? '↑' : '↓') : ''}`}</th>
                  <th onClick={() => handleSort('title')}>{`Title ${sortKey === 'title' ?  (sortOrder === 'asc' ? '↑' : '↓') : ''}`}</th>
                  <th onClick={() => handleSort('price')}>{`Price ${sortKey === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}`}</th>
                  <th onClick={() => handleSort('description')}>{`Description ${sortKey === 'description' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}`}</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className={styles.homeProductControls}>
          {user.gender === 'male' && (
          <div className={styles.homeAddProduct}>
            <h3>{`Add Product`}</h3>
            <form onSubmit={(event) => addNewProduct(event)}>
              <div className={styles.homeAddProductInputContainer}>
                <label htmlFor="name">{'Product Name'}</label>
                <input
                  type="text"
                  id="name"
                  value={productName}
                  onChange={(e) => setproductName(e.target.value)}
                />
              </div>
              <div className={styles.homeAddProductInputContainer}>
                <label htmlFor="name">{'Price'}</label>
                <input
                  type="text"
                  id="Price"
                  value={productPrice}
                  onChange={event => setproductPrice(parseInt(event.target.value.replace(/\D/,'')))}
                />
              </div>
              <div className={styles.homeAddProductInputContainer}>
                <label htmlFor="name">{'Product Description'}</label>
                <textarea
                  id="Price"
                  value={productDescription}
                  onChange={(e) => setproductDescription(e.target.value)}
                />
                {error && <div className={styles.errorMessage}>{error}</div>}
              </div>
              <button className={styles.homeAddProductButton}>{`Add Product`}</button>
            </form>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
