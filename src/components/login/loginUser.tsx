import axios, { AxiosResponse } from 'axios';
import { User } from './Login.type';

const loginUser = async (username: string, password: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.post<User>('https://dummyjson.com/auth/login', {
      username,
      password
    });

    const userData = response.data;


    return userData;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default loginUser;
