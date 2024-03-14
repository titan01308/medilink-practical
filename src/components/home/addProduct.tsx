import axios, { AxiosResponse } from 'axios';
import { Product } from './Home';

const addProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await axios.post<Product>('https://dummyjson.com/products/add', {
      newProduct
    });

    const productResponse = response;

    console.log(productResponse,'asdasds')


    return productResponse.data;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default addProduct;
