import './App.css';
import { FiLoader } from "react-icons/fi";
import { StateProvider, StateContext } from './components/Context';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';

const App = () => {

  return (
    <StateProvider>
      <Child />
    </StateProvider>
  )
}

const Child = () => {
  return (
    <main>
      <div id="cards-container" className="grid md:grid-cols-3 lg:grid-cols-4 md:mx-[4.5vw] lg:mx-[9.5vw] place-items-center my-14">
        <Navbar />
        <Card />
      </div>
    </main>
  )
}

export default App