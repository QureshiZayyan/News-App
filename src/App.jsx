import './App.css';
import { StateContext } from './components/Context';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { useContext } from 'react';

const App = () => {

  const { title } = useContext(StateContext);

  return (
    <main>
      <Navbar />
      {title ? <h3 className='text-center text-2xl relative top-12'>Showing Results for {title}</h3> : null}
      <div id="cards-container" className="grid md:grid-cols-3 lg:grid-cols-4 md:mx-[4.5vw] lg:mx-[9.5vw] place-items-center my-20">
        <Card />
      </div>
    </main>
  )
}

export default App;