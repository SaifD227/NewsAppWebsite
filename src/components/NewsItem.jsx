
import PropTypes from 'prop-types';

const NewsItem = (props) => {
    const { title, description, imageUrl, newsUrl, author, date, source } = props;
    const fallbackImage = "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202406/oneplus-nord-ce4-lite-242805355-16x9_1.jpg?VersionId=BphZKdHyfYABHKDaky79qOKy84GjYy1w"; // Placeholder image URL

    return (
        <div className='my-3'>
            <div className="card">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1'}}>
                    {source}
                </span>
                <img
                    src={imageUrl || fallbackImage}
                    onError={(e) => { e.target.src = fallbackImage }}
                    alt="News"
                    className="card-img-top"
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div>
    );
}

NewsItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    newsUrl: PropTypes.string.isRequired,
    author: PropTypes.string,
    date: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
};

export default NewsItem;
