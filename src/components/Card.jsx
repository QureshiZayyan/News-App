import { useEffect, useContext, useState } from "react";
import { StateContext } from "./Context";
import { FiLoader } from "react-icons/fi";

const Card = () => {
  const { errors, setErrors, query, setData, data, setTitle } = useContext(StateContext);
  const [loading, setloading] = useState(false);

  const apiKey = '8821a433cdf3f62a0a841d5d773d2797';

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      setErrors(false);
      try {
        const response = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${apiKey}`);
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setData(data.articles);
        console.log(data);
      } catch (error) {
        console.log(error);
        setErrors(true);
        setTitle('');
      } finally {
        setloading(false);
      }
    }

    fetchData();
  }, [query]);

  return (
    <>
      {loading ? (
        <div className='loader'>
          <FiLoader size={50} className='loading-icon' />
        </div>
      ) : data && data.length > 0 ? (
        data.map((article) => (
          <div key={article.url} id='card' className="card relative w-[30vw] md:w-[28vw] lg:w-[21vw] my-[19px] hover:opacity-[5] shadow-xl bg-white">
            <div id="card-img" className="w-full">
              <img src={article.image} alt="Article" id="newsimg" className="h-[125px] md:h-[130px] w-full p-[10px] rounded-[20px]" />
            </div>
            <div id="news-content" className="h-[150px] md:h-[180px] lg:h-[200px] xl:h-[180px] px-[9px] py-[5px] bg-white text-black text-sm">
              <h2 id="news-desc">{truncateText(article.description, 110)}</h2>
              <p id="publishedat" className="my-3 font-bold">Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
              <a href={article.url} className="link inline-block my-[4px] text-white absolute bottom-[14px] bg-black  py-[5px] px-[8px] rounded-[5px]" target="_blank" rel="noopener noreferrer" id="newslink">Read More...</a>
            </div>
          </div>
        ))
      ) : errors ?
        <p className="text-bold text-center">Oops! Something Went Wrong</p>
        :
        null
      }

    </>
  );
}

export default Card;