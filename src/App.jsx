import './App.css';
import { useState, useEffect } from 'react';
import { FiLoader } from "react-icons/fi";

const App = () => {
  const [data, setData] = useState([]);
  const [input, SetInput] = useState('');
  const [query, setQuery] = useState('mumbai');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);

  const url = 'https://newsapi.org/v2/everything?q=';
  const apiKey = '8aeed9e210e1426fa21bf17f4c230b54';

  useEffect(() => {

    const FetchData = async () => {
      setLoading(true);
      setErrors(false);
      try {
        const Data = await fetch(`${url}${query}&apiKey=${apiKey}`);
        if (!Data.ok) throw new Error('error fetching data');
        const response = await Data.json();
        setData(response.articles);
        console.log(response);
      } catch (er) {
        console.log(er);
        setErrors(true);
      }
      finally {
        setLoading(false);
      }

    }
    FetchData();
  }, [query])

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  }

  const submit = (e) => {
    e.preventDefault();
    if (!input) return;
    setQuery(input.trim());
    setData([]);
    SetInput('');
    setErrors(false)
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
                placeholder="Search News" value={input} onChange={(e) => SetInput(e.target.value)} />
              <button id="btn"
                className="bg-blue-600 px-[6px] py-[4.6px] rounded-md font-bold text-white">Search</button>
            </form>
          </div >
        </nav >
      </header >

      <main>

        <div id="cards-container" className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-4 md:gap-x-20 lg:gap-x-4 mx-20 place-items-center my-12">
          {
            loading
              ?
              <div className='loader'>
                <FiLoader size={50} className='loading-icon' />
              </div>
              :
              errors ? <p>some error occured</p>
                :
                data && data.length > 0
                  ?
                  data.map((article) => (
                    <div id="card"
                      key={article} className="card w-[30vw] sm:w-[40vw] md:w-[28vw] lg:w-[20vw] xl:w-[268.8px] my-4 hover:opacity-[5] shadow-md">
                      <div id="card-img" className="w-full">
                        <img src={article.urlToImage} alt="" id="newsimg" className="h-[125px] sm:h-[100px] md:h-[130px] w-full" />
                      </div>
                      <div id="news-content"
                        className="h-[150px] md:h-[180px] lg:h-[180px] xl:h-[180px] px-[5px] py-[5px] bg-white text-black text-sm">
                        <h2 id="news-desc">{truncateText(article.description, 110)}</h2>
                        <a href={article.url} className="link inline-block hover:underline hover:text-blue-700 my-[2px]"
                          target="_blank" id="newslink">Read More...</a>
                        <p id="publishedat">PublishedAt : {new Date(article.publishedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                  :
                  <p>data error</p>
          }
        </div>
      </main>
    </>
  )
}

export default App
