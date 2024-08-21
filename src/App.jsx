import './App.css';
import { useState, useEffect } from 'react';
import { FiLoader } from "react-icons/fi";

const App = () => {
  const [data, setData] = useState([]);
  const [input, SetInput] = useState('');
  const [query, setQuery] = useState('cricket');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);

  const apiKey = '8821a433cdf3f62a0a841d5d773d2797';

  useEffect(() => {

    const FetchData = async () => {
      setLoading(true);
      setErrors(false);
      try {
        const Data = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${apiKey}`);
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
        <nav className="flex justify-between items-center px-[20px] py-[10.5px] shadow-md">
          <div className="heading">
            <a href="" onClick={() => window.location.reload()}>
              <h2 id="reload" className="text-2xl font-extrabold cursor-pointer text-white">NewsWeb</h2>
            </a>
          </div >

          <div className="search">
            <form onSubmit={submit}>
              <input type="text" name="" id="input"
                className="font-bold focus:outline-none w-[250px] py-[4.2px] px-[5px] text-black rounded-md"
                placeholder="Search News" value={input} onChange={(e) => SetInput(e.target.value)} />
              <button id="btn"
                className="px-[6px] py-[4.6px] bg-blue-500 rounded-md font-bold text-white ml-[5px]">Search</button>
            </form>
          </div >
        </nav >
      </header >

      <main>

        <div id="cards-container" className="grid md:grid-cols-3 lg:grid-cols-4 md:mx-[4.5vw] lg:mx-[9.5vw] place-items-center my-10">
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
                    (
                      <>
                        {
                          <div id='card' key={article.author} className="card w-[30vw] md:w-[28vw] lg:w-[19vw] my-[14px] hover:opacity-[5] shadow-lg">
                            <div id="card-img" className="w-full">
                              <img src={article.image} alt="" id="newsimg" className="h-[125px] md:h-[130px] w-full" />
                            </div>
                            <div id="news-content" className="h-[150px] md:h-[180px] lg:h-[170px] xl:h-[180px] px-[7px] py-[5px] bg-white text-black text-sm">
                              <h2 id="news-desc">{truncateText(article.description, 110)}</h2>
                              <a href={article.url} className="link inline-block my-[4px] text-blue-600"
                                target="_blank" id="newslink">Read More...</a>
                              <p id="publishedat">PublishedAt : {new Date(article.publishedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        }
                      </>
                    )
                  ))
                  :
                  <p>data error</p>
          }
        </div >
      </main>
    </>
  )
}

export default App
