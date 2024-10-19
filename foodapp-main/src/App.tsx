
import './App.css';

import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/homepage/Home'
import Menu from './pages/menupage/Menu'
import CartPage from './pages/CartPage/CartPage'
import LoginPage from './pages/Loginpage/LoginPage'
import { useLayoutEffect } from 'react'
import UserInfoPage from './pages/UserInfoPage/UserInfoPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userLogout } from './redux/slices/LoginSlice'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { showTopBrandData } from './redux/thunk/TopBrands'
import ContactPage from './components/contact/Contact';

const App = () => {

  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  // const [userData, setUserData] = useState<{email:string, password: string} | null>(null);

  const login = useSelector((state : any) => state.login);
  // console.log(login);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(showTopBrandData() as any); 
    const d = window.localStorage.getItem('userData');
    if(d){
      dispatch(userLogin(JSON.parse(d)));
    }
    else{
      dispatch(userLogout(null));
    }
  }, []);

  const location = useLocation();
  return (
    <div>
      {(location.pathname !== '/login') && (<Navbar/>)}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={!login.isLoggedIn ? <LoginPage/> : <UserInfoPage/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/cart' element={<PrivateRoute><CartPage/></PrivateRoute>}/>
        <Route path='/info' element={<UserInfoPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </div> 
  )
}

export default App;
