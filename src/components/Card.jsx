import { useEffect, useContext } from "react";
import { stateContext } from "./Context";

const Card = () => {

  const { setLoading, setErrors, setData, query } = useContext(stateContext);
  const apiKey = '8821a433cdf3f62a0a841d5d773d2797';

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  }

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

  return (
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
  )
}

export default Card