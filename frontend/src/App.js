import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/header/Header';
import { Route, Routes } from 'react-router';
import { Homepage } from './pages/homepage/Homepage';
import { Services } from './pages/services/Services';
import { Replacement } from './components/replacement/Replacement';
import { LeaveCar } from './components/leaveCar/LeaveCar';
import { PickUpCar } from './components/pickupCar/PickupCar';
import { DropCar } from './components/dropcar/DropCar';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/services' element={<Services/>}>
          <Route path='replacement' element={<Replacement/>}/>
          <Route path='leave' element={<LeaveCar/>}/>
          <Route path='pickup' element={<PickUpCar/>}/>
          <Route path='dropcar' element={<DropCar/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
