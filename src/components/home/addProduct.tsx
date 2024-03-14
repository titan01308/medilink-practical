import axios, { AxiosResponse } from 'axios';
import { Product } from './Home';

const addProduct = async (newProduct: Product): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await axios.post<Product>('https://dummyjson.com/products/add', {
      newProduct
    });

    const productResponse = response;


    if(productResponse.status === 200 && productResponse.data) {
      return productResponse.data;
    } 
    
    return null;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default addProduct;
