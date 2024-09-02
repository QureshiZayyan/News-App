import { useEffect, useContext } from "react";
import { StateContext } from "./Context";
import { FiLoader } from "react-icons/fi";

const Card = () => {
  const { loading, errors, data setData, query } = useContext(StateContext);
  const apiKey = '8821a433cdf3f62a0a841d5d773d2797';

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "..."; // Add ellipsis to truncated text
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, setData, apiKey]);

  return (
    <>
      {loading ? (
        <div className='loader'>
          <FiLoader size={50} className='loading-icon' />
        </div>
      ) : errors ? (
        <p>Error occurred</p>
      ) : data && data.length > 0 ? (
        data.map((article) => (
          <div key={article.url} id='card' className="card w-[30vw] md:w-[28vw] lg:w-[19vw] my-[14px] hover:opacity-[5] shadow-lg">
            <div id="card-img" className="w-full">
              <img src={article.image} alt="Article" id="newsimg" className="h-[125px] md:h-[130px] w-full" />
            </div>
            <div id="news-content" className="h-[150px] md:h-[180px] lg:h-[170px] xl:h-[180px] px-[7px] py-[5px] bg-white text-black text-sm">
              <h2 id="news-desc">{truncateText(article.description, 110)}</h2>
              <a href={article.url} className="link inline-block my-[4px] text-blue-600" target="_blank" rel="noopener noreferrer" id="newslink">Read More...</a>
              <p id="publishedat">Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      ) : null}
    </>
  );
}

export default Card;
