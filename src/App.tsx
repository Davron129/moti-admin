import { Routes, Route } from 'react-router-dom';

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
            <Route path={'login'} element={<Login />} />
            <Route element={<InnerComponent />} >
                <Route path={'order'} element={<Order />} />
                <Route path={'booking'} element={<Booking />} />
                <Route path={'categories'} element={<Dashboard />} />
                <Route path={'category/add'} element={<CategoryAdd />} />
                <Route path={'food/edit/:id'} element={<CategoryEdit />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
