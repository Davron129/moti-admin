import { Routes, Route } from 'react-router-dom';
import InnerComponent from './components/InnerComponent';
import './App.css';
import CategoryAdd from "./views/CategoryAdd/CategoryAdd";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route element={<InnerComponent />} >
                <Route path={'dashboard'} element={<Dashboard />} />
                <Route path={'category/add'} element={<CategoryAdd />} />
            </Route>
        </Routes>
      {/*<InnerComponent />*/}
    </div>
  );
}

export default App;
