
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Elektron from './Elektron';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Routes>  
        <Route path='/' element={<Elektron/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
