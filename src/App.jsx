import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [data, setdata] = useState([]);
  const [text, settext] = useState('');
  const [query, setquery] = useState('mumbai')

  const url = 'https://newsapi.org/v2/everything?q=';
  const apiKey = '8aeed9e210e1426fa21bf17f4c230b54';

  useEffect(() => {

    const FetchData = async () => {

      try {
        const Data = await fetch(`${url}${query}&apiKey=${apiKey}`);
        const response = await Data.json();
        console.log(response);
        setdata(response)
        return response;
      } catch (er) {
        console.log(er);
      }
      finally {
        console.log('request accepted');
      }
    }
    FetchData();
  }, [query])

  const change = (e) => {
    settext(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    if (!text) return;
    setquery(text.trim())
    settext('')
  };

  return (
    <>

      <header className="sticky top-0 z-[1]">
        <nav className="flex justify-between items-center px-[20px] py-[10px] shadow-md bg-blue-200">
          <div className="heading">
            <a href="#">
              <h2 id="reload" className="text-2xl font-extrabold cursor-pointer text-black">NewsWeb</h2>
            </a>
          </div >

          <div className="search">
            <form onSubmit={submit}>
              <input type="text" name="" id="input"
                className="font-bold focus:outline-none w-[250px] py-[4px] px-[3.5px] text-black rounded-md"
                placeholder="Search News" value={text} onChange={change} />
              <button id="btn"
                className="bg-blue-600 px-[6px] py-[4.6px] rounded-md font-bold text-white">Search</button>
            </form>
          </div >
        </nav >
      </header >

      {<p></p>}
      <main>

        <div id="card"
          className="card w-[30vw] sm:w-[40vw] md:w-[28vw] lg:w-[20vw] xl:w-[268.8px] my-4 shadow-bs hover:opacity-[5]">
          <div id="card-img" className="w-full">
            <img src="" alt="" id="newsimg" className="h-[125px] sm:h-[100px] md:h-[130px] rounded-t-[8px] w-full" />
          </div>
          <div id="news-content"
            className="h-[150px] md:h-[180px] lg:h-[180px] xl:h-[180px] px-[5px] py-[5px] bg-white text-black rounded-b-[8px] text-sm">
            <h2 id="news-desc"></h2>
            <a href="" className="link inline-block hover:underline hover:text-blue-700 my-[2px]"
              target="_blank" id="newslink"></a>
            <p id="publishedat"></p>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
