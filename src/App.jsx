import './App.css';
import { StateContext } from './states/StateProvider';
import { Navbar } from './components/Navbar';
import { Card } from './components/Card';
import { useContext } from 'react';

const App = () => {

  const { query } = useContext(StateContext);

  return (
    <main>
      <Navbar />
      <h3 className='text-center text-2xl relative top-12'>Showing Results for {query}</h3>
      <div id="cards-container" className="grid md:grid-cols-3 lg:grid-cols-4 md:mx-[10vw] lg:mx-[9.7vw] place-items-center my-20">
        <Card />
      </div>
    </main>
  )
}

export default App;