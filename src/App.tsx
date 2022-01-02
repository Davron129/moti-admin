import { Routes, Route, Navigate } from 'react-router-dom';

import Test from './views/Test'
import Order from './views/Order';
import Booking from './views/Booking';
import Login from './views/Login/Index';
import Dashboard from "./views/Dashboard";
import CategoryEdit from './views/CategoryEdit';
import InnerComponent from './components/InnerComponent';
import CategoryAdd from "./views/CategoryAdd/CategoryAdd";

import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route index element={<Test />} />
            <Route path={'/login'} element={<Login />} />
            <Route element={<InnerComponent />} >
                <Route path={'/order'} element={<Private><Order /></Private>} />
                <Route path={'/booking'} element={<Private><Booking /></Private>} />
                <Route path={'/categories'} element={<Private><Dashboard /></Private>} />
                <Route path={'/category/add'} element={<Private><CategoryAdd /></Private>} />
                <Route path={'/food/edit/:id'} element={<Private><CategoryEdit /></Private>} />
            </Route>
        </Routes>
    </div>
  );
}

const Private = ({ children }: { children: JSX.Element }) => {
  return localStorage.getItem("moti_token") ? children : <Navigate to='/login' />
}

export default App;
