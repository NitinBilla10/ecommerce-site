
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Elektron from './Elektron';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';
import VendorPage from './components/VendorPage';
import { useAuth } from './context/auth';
import Productcard from './components/Productcard';
import ProductsbyCategory from './components/ProductsbyCategory';
import Exploreproducts from './components/Exploreproducts';
import Cart from './components/Cart';






function App() {
  const [auth]=useAuth()
 const userdetail=localStorage.getItem('auth');






  return (
    <div>
      <Routes>  
        <Route path='/' element={<Elektron/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={!(userdetail || auth.user)?(<Navigate to="/login"/>):(<VendorPage/>)}/>
        <Route path='/product/:slug' element={<Productcard/>}/>
        <Route path='/byCategory/:category' element={<ProductsbyCategory/>}/>
        <Route path='/exploreproducts' element={<Exploreproducts/>}/>
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
