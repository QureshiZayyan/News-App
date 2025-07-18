import './App.css';
import { StateContext } from './states/StateProvider';
import { Navbar } from './components/Navbar';
import { Card } from './components/Card';
import { useContext } from 'react';

const App = () => {

  const { heading } = useContext(StateContext);

  return (
    <main>
      <Navbar />
      {heading && <h3 className='text-center text-2xl relative font-semibold top-12'>Showing Results for {heading}</h3>}
      <div id="cards-container" className="grid lg:grid-cols-4 md:mx-[10vw] lg:mx-[4vw] place-items-center my-16">
        <Card />
      </div>
    </main>
  )
}

export default App;