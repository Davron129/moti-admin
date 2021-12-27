import { Routes, Route } from 'react-router-dom';

import Order from './views/Order';
import Booking from './views/Booking';
import Login from './views/Login/Index';
import Dashboard from "./views/Dashboard";
import Private from './components/Private';
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
                <Route path={'order'} element={<Private><Order /></Private>} />
                <Route path={'booking'} element={<Private><Booking /></Private>} />
                <Route path={'categories'} element={<Private><Dashboard /></Private>} />
                <Route path={'category/add'} element={<Private><CategoryAdd /></Private>} />
                <Route path={'food/edit/:id'} element={<Private><CategoryEdit /></Private>} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
