import React, { useState, useEffect } from 'react';
import './news.css';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-02-01&sortBy=publishedAt&apiKey=8b8ac0da00d140a69ce817e382b0ba7e');
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Newspaper App</h1>
      </header>
      <main>
        {articles.map((article, index) => (
          <div className="article" key={index}>
            <h2>{article.title}</h2>
            {article.author && <p className="author">By {article.author}</p>}
            {article.description && <p className="description">{article.description}</p>}
            {article.urlToImage && <img className="image" src={article.urlToImage} alt="Article" />}
            <p className="published-at">Published At: {article.publishedAt}</p>
            <a className="read-more" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default News;
