import './App.css';
import { FiLoader } from "react-icons/fi";
import { StateProvider, stateContext } from './components/Context';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';

const App = () => {

  return (
    <StateProvider>
      <child />
    </StateProvider>
  )
}

const Child = () => {
  const { loading, errors } = useContext(stateContext);
  <main>
    <div id="cards-container" className="grid md:grid-cols-3 lg:grid-cols-4 md:mx-[4.5vw] lg:mx-[9.5vw] place-items-center my-14">
      <Navbar />
      {loading ?
        <div className='loader'>
          <FiLoader size={50} className='loading-icon' />
        </div>
        :
        errors ? <p>error occured</p>
          :
          <Card />
      }
    </div >
  </main>
}

export default App