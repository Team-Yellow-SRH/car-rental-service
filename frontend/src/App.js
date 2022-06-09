import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/header/Header';
import { Route, Routes } from 'react-router';
import { Homepage } from './pages/homepage/Homepage';
import { Services } from './pages/services/Services';
import { Replacement } from './components/replacement/Replacement';
import { LeaveCar } from './components/leaveCar/LeaveCar';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/services' element={<Services/>}>
          <Route path='replacement' element={<Replacement/>}/>
          <Route path='leave' element={<LeaveCar/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
