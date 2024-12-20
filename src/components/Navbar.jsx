import { useContext } from 'react';
import { StateContext } from '../states/StateProvider';

export const Navbar = () => {

  const { input, setInput, setErrors, setQuery, setTitle } = useContext(StateContext);

  const submit = (e) => {
    e.preventDefault();
    if (!input) return;
    setQuery(input);
    setInput('');
  };

  return (
    <header className="sticky top-0 z-[1]">
      <nav className="flex justify-between items-center px-[20px] py-[10.5px] shadow-md">
        <div className="heading">
          <a href="" onClick={() => window.location.reload()}>
            <h2 id="reload" className="text-2xl font-extrabold cursor-pointer text-white">NewsWeb</h2>
          </a>
        </div >

        <div className="search">
          <form onSubmit={submit}>
            <input type="text" name="" id="input"
              className="focus:outline-none w-[250px] py-[4.2px] px-[5px] text-black rounded-md"
              placeholder="Search News" value={input} onChange={(e) => setInput(e.target.value)} />
            <button id="btn"
              className="px-[6px] py-[4.6px] bg-blue-500 rounded-md font-bold text-white ml-[5px]">Search</button>
          </form>
        </div >
      </nav >
    </header >
  )
}
