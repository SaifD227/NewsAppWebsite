import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component'; // Correct import

const News = ({ setProgress, pageSize, country, category }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const fetchNews = useCallback(async () => {
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=4b599e6b598e46e8bff6808e3a4bf272&page=${page}&pageSize=${pageSize}`;
        setLoading(true);

        try {
            const response = await fetch(url);
            if (response.status === 429) {
                console.error('Rate limit exceeded');
                setLoading(false);
                return;
            }
            const parsedData = await response.json();
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);
            setProgress(100);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false);
        }
    }, [category, country, page, pageSize, setProgress]);

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
        fetchNews();
    }, [category, fetchNews]);

    const fetchMoreData = async () => {
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=4b599e6b598e46e8bff6808e3a4bf272&page=${page + 1}&pageSize=${pageSize}`;

        try {
            const response = await fetch(url);
            const parsedData = await response.json();
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div className='container my-3'>
            <h1 className='text-center'>NewsMonkey - Top Headlines from {capitalizeFirstLetter(category)}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((element) => (
                            <div className='col-lg-4 col-md-6 col-sm-12' key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : 'No Title'}
                                    description={element.description ? element.description : 'No Description'}
                                    imageUrl={element.urlToImage ? element.urlToImage : 'No Image'}
                                    newsUrl={element.url}
                                    author={element.author ? element.author : 'Unknown'}
                                    date={element.publishedAt ? new Date(element.publishedAt).toLocaleString() : 'No Date'}
                                    source={element.source.name ? element.source.name : 'Unknown'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.propTypes = {
    setProgress: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
};

export default News;
