# This project is for Medilink practical exam purposes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run the program

In the project directory:

### `npm install`

After the installation of some libraries, you can run it by:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser and you will be redirected to login as the frontpage of the app.

## Login

for testing you can use the following credentials from dummyjson.com `https://dummyjson.com/users`
sample test users

`username: atuny0`
`password: 9uQFF1Lh`
`gender: male`

`username: dpettegre6`
`password: YVmhktgYVS`
`gender: female`

Please note that I used the gender as roles as dummyjson.com does not have role in its user.

`viewer - female`
`editor - male`

I also temporarily disabled the validation for password requiring 1 special character (dummyjson passwords uses only alphanumeric combinations)

To enable it uncomment `line: 20 on Login.tsx`

### Additional libraries used

Axios, react-icon, sass


## Product 

for product I have used the data from `https://dummyjson.com/products`

I have used the endpoint for adding new product, unfortunately it will not be added to the server as limitation.

That is why I proceed to just add it on the variable, but did a validation if the return is 200 and data is existing before executing.


## Responsive Design

You can check the responsive designs in browserstack or browsers built in device toolbar.

The image used in the login page is from medilink webpage, i do not own it and used it solely for this purpose. 
