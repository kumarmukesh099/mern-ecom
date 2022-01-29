import * as React from 'react';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import {Provider} from 'react-redux';
import store12 from './store.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Divider } from '@mui/material';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/userEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductAddScreen from './screens/ProductAddScreen';
import ProductEditScreen from './screens/productEditScreen';
import OrderListScreen from './screens/OrderListScreen';



const App = () => { 
  return (
    <Provider store={store12}>
    <Router>
      <Header />
      <main>
        <CssBaseline />
      <Container maxWidth="fixed">
        <Routes >
        <Route path="/" exact element={<HomeScreen/>} /> 
        <Route path="/product/:id" element={<ProductScreen/>} /> 
        <Route path="/cart" element={<CartScreen/>} /> 
        <Route path="/cart/:id" element={<CartScreen/>} /> 
        <Route path="/login" element={<LoginScreen/>} /> 
        <Route path="/register" element={<RegisterScreen/>} /> 
        <Route path="/profile" element={<ProfileScreen/>} /> 
        <Route path="/shipping" element={<ShippingScreen/>} /> 
        <Route path="/payment" element={<PaymentScreen/>} />
        <Route path="/placeOrder" element={<PlaceOrderScreen/>} />  
        <Route path="/order/:id" element={<OrderScreen/>} /> 
        <Route path="/admin/orders" element={<OrderListScreen/>} /> 
        <Route path="/admin/users" element={<UserListScreen/>} />  
        <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} /> 
        <Route path="/admin/products" element={<ProductListScreen/>} /> 
        <Route path="/admin/products/add" element={<ProductAddScreen/>} /> 
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} /> 
        </Routes>
      </Container>
      </main>
      <Divider style={{border:"1px solid blue",margin:"10px"}}/>
      <Footer />
    </Router>
    </Provider>
  )
}

export default App
