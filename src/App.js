
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import ProtectedRoutes from './services/ProtectedRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />


          <Route path='/' element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;












































 















     