import React, { useState } from 'react';
import loginUser from './loginUser';
import Home from '../home/Home';
import { MdArrowBack } from "react-icons/md";

import styles from './Login.module.scss';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.');
      return;
    }

    try {
      const userData = await loginUser(username, password);

      setUser(userData);
    } catch (error) {
      setError('Invalid username or password.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <>
      {!user ? (
        <div className={styles.container}>

          <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
              {currentStep !== 1 && 
                <button className={styles.loginBack} onClick={() => handleBack()}>
                  <MdArrowBack />
                  <span>{'Back'}</span>
                </button>
              } 
              <h2>{`${currentStep === 1 ? 'Welcome' : 'Enter your password'}`}</h2>
              <form onSubmit={(event) => handleSubmit(event)}>
              {currentStep === 1 ? (
                <>
                  <div className={styles.inputContainer}>
                    <label htmlFor="username">{'Username'}</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <button disabled={username ? false : true} type="button" onClick={() => handleNext()}>{'Continue'}</button>
                </>
              ) : ( 
                <>
                  <div className={styles.inputContainer}>
                    <label htmlFor="password">{'Password'}</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  </div>
                  <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                </>
              )}
              </form>
            </div>
            <div className={styles.sideImage}>
              <img src="https://www.medilink.com.ph/img/banner.png" />
            </div>
          </div>
        </div>
      ) : (
        <Home user={user} />
      )}
    </>
      
  );
};

export default Login;
